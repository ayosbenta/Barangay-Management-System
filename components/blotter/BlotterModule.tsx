import React, { useState, useMemo } from 'react';
import { useLuponCases } from '../../hooks/useBlotter';
import { LuponCase, CaseStatus } from '../../types';
import BlotterTable from './BlotterTable';
import BlotterForm from './BlotterForm';
import Modal from '../common/Modal';
import Button from '../common/forms/Button';
import PlusIcon from '../icons/PlusIcon';
import StatCard from '../common/StatCard';
import FileStackIcon from '../icons/FileStackIcon';
import ClockIcon from '../icons/ClockIcon';
import HandshakeIcon from '../icons/HandshakeIcon';
import GavelIcon from '../icons/GavelIcon';

const BlotterModule: React.FC = () => {
    const { cases, isLoading, addCase, updateCase, deleteCase } = useLuponCases();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [currentCase, setCurrentCase] = useState<LuponCase | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const caseStats = useMemo(() => {
        const totalCases = cases.length;
        const activeCases = cases.filter(c => 
            [CaseStatus.FILED, CaseStatus.MEDIATION, CaseStatus.CONCILIATION].includes(c.status)
        ).length;
        const settledCases = cases.filter(c => c.status === CaseStatus.SETTLED).length;
        const courtCases = cases.filter(c => c.status === CaseStatus.CERTIFIED_FOR_COURT).length;
        return { totalCases, activeCases, settledCases, courtCases };
    }, [cases]);

    const handleAddNew = () => {
        setCurrentCase(null);
        setIsModalOpen(true);
    };

    const handleEdit = (caseRecord: LuponCase) => {
        setCurrentCase(caseRecord);
        setIsModalOpen(true);
    };

    const handleDelete = async (caseId: string) => {
        if (window.confirm('Are you sure you want to delete this case file?')) {
            await deleteCase(caseId);
        }
    };

    const handleSave = async (caseData: Omit<LuponCase, 'id'> | LuponCase) => {
        setIsSaving(true);
        if ('id' in caseData) {
            await updateCase(caseData as LuponCase);
        } else {
            await addCase(caseData as Omit<LuponCase, 'id'>);
        }
        setIsSaving(false);
        setIsModalOpen(false);
    };

    const handlePrint = (caseToPrint: LuponCase) => {
        const printContent = `
            <html>
                <head>
                    <title>Case File: ${caseToPrint.caseNumber}</title>
                    <style>
                        body { font-family: 'Times New Roman', Times, serif; margin: 40px; color: #000; }
                        .header { text-align: center; line-height: 1.2; }
                        .header p { margin: 0; }
                        .title { font-weight: bold; font-size: 1.2em; margin-top: 20px; margin-bottom: 20px; }
                        .case-details { margin-top: 30px; }
                        .case-details table { width: 100%; border-collapse: collapse; }
                        .case-details td { padding: 8px; vertical-align: top; }
                        .case-details td:first-child { font-weight: bold; width: 150px; }
                        .section { margin-top: 20px; }
                        .section h3 { font-weight: bold; text-transform: uppercase; border-bottom: 1px solid black; padding-bottom: 4px; margin-bottom: 10px;}
                        .narrative { text-align: justify; text-indent: 40px; margin-top: 10px; line-height: 1.5;}
                        .footer { margin-top: 80px; }
                        .footer p { margin: 0; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <p>Republic of the Philippines</p>
                        <p>Province of Cebu</p>
                        <p>City of Talisay</p>
                        <p><strong>BARANGAY DUMLOG</strong></p>
                        <p class="title">OFFICE OF THE LUPONG TAGAPAMAYAPA</p>
                    </div>

                    <div class="case-details">
                        <table>
                            <tr>
                                <td>CASE NO.:</td>
                                <td><strong>${caseToPrint.caseNumber}</strong></td>
                            </tr>
                            <tr>
                                <td>COMPLAINANT:</td>
                                <td>${caseToPrint.complainant}</td>
                            </tr>
                            <tr>
                                <td>RESPONDENT:</td>
                                <td>${caseToPrint.respondent}</td>
                            </tr>
                             <tr>
                                <td>DATE FILED:</td>
                                <td>${new Date(caseToPrint.dateFiled).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                            </tr>
                        </table>
                    </div>

                    <div class="section">
                        <h3>Complaint: ${caseToPrint.natureOfComplaint}</h3>
                        <p class="narrative">${caseToPrint.narrative.replace(/\n/g, '<br>')}</p>
                    </div>

                    <div class="section">
                        <h3>Action Taken:</h3>
                        <p>${caseToPrint.actionTaken || 'No action recorded yet.'}</p>
                    </div>
                    
                    ${caseToPrint.status === 'Amicably Settled' && caseToPrint.settlementDetails ? `
                    <div class="section">
                        <h3>Amicable Settlement:</h3>
                        <p>${caseToPrint.settlementDetails}</p>
                    </div>
                    ` : ''}

                     <div class="section">
                        <h3>Status:</h3>
                        <p><strong>${caseToPrint.status}</strong></p>
                    </div>

                    <div class="footer">
                        <p>Prepared by:</p>
                        <br/><br/><br/>
                        <p>_________________________</p>
                        <p>Barangay Secretary / Lupon Secretary</p>
                    </div>
                </body>
            </html>
        `;

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
                printWindow.print();
            }, 250);
        } else {
            alert('Popup blocked! Please allow popups for this site to print the case file.');
        }
    };
    
    const filteredCases = useMemo(() => {
        if (!searchTerm) return cases;
        return cases.filter(c => 
            `${c.caseNumber} ${c.complainant} ${c.respondent} ${c.natureOfComplaint}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [cases, searchTerm]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-bms-text">Katarungang Pambarangay</h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Cases" value={caseStats.totalCases} icon={<FileStackIcon className="w-8 h-8"/>} />
                <StatCard title="Active Cases" value={caseStats.activeCases} icon={<ClockIcon className="w-8 h-8"/>} color="magenta" />
                <StatCard title="Amicably Settled" value={caseStats.settledCases} icon={<HandshakeIcon className="w-8 h-8"/>} />
                <StatCard title="For Court Action" value={caseStats.courtCases} icon={<GavelIcon className="w-8 h-8"/>} color="text" />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                 <div className="flex items-center gap-4 w-full md:w-auto">
                    <input 
                        type="text"
                        placeholder="Search cases..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-64 bg-bms-primary border border-bms-tertiary rounded-md p-2 text-sm text-bms-text focus:outline-none focus:ring-2 focus:ring-bms-cyan/50"
                    />
                </div>
                <Button onClick={handleAddNew} icon={<PlusIcon className="w-4 h-4" />}>
                    File Complaint
                </Button>
            </div>
            
            {isLoading && cases.length === 0 ? (
                 <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-4 border-bms-cyan/50 border-t-bms-cyan rounded-full animate-spin"></div>
                    <p className="ml-4 text-bms-accent">Loading KP case files...</p>
                </div>
            ) : filteredCases.length > 0 ? (
                <BlotterTable cases={filteredCases} onEdit={handleEdit} onDelete={handleDelete} onPrint={handlePrint} />
            ) : (
                <div className="text-center py-16 bg-bms-secondary/30 rounded-lg">
                    <h3 className="text-xl font-semibold text-bms-text">No Cases Found</h3>
                    <p className="text-bms-accent mt-2">No records match your search criteria, or no complaints have been filed.</p>
                </div>
            )}

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title={currentCase ? `Edit Case: ${currentCase.caseNumber}` : 'File New Complaint'}
            >
                <BlotterForm
                    caseRecord={currentCase}
                    onSave={handleSave}
                    onClose={() => setIsModalOpen(false)}
                    isSaving={isSaving}
                />
            </Modal>
        </div>
    );
};

export default BlotterModule;