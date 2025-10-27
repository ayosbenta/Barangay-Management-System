import React, { useState, useMemo } from 'react';
import { useDocuments } from '../../hooks/useDocuments';
import { Document, DocumentType } from '../../types';
import DocumentTable from './DocumentTable';
import DocumentForm from './DocumentForm';
import Modal from '../common/Modal';
import Button from '../common/forms/Button';
import PlusIcon from '../icons/PlusIcon';
import StatCard from '../common/StatCard';
import DocumentIcon from '../icons/DocumentIcon';
import ClockIcon from '../icons/ClockIcon';
import ApprovedIcon from '../icons/ApprovedIcon';

const DocumentsModule: React.FC = () => {
    const { documents, isLoading, addDocument, updateDocument, deleteDocument } = useDocuments();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const documentStats = useMemo(() => {
        const total = documents.length;
        const pending = documents.filter(d => d.status === 'Pending').length;
        const thisMonth = new Date().getMonth();
        const thisYear = new Date().getFullYear();
        const approvedThisMonth = documents.filter(d => {
            const issuedDate = new Date(d.dateIssued);
            return d.status === 'Approved' && issuedDate.getMonth() === thisMonth && issuedDate.getFullYear() === thisYear;
        }).length;
        return { total, pending, approvedThisMonth };
    }, [documents]);

    const handleAddNew = () => {
        setCurrentDocument(null);
        setIsModalOpen(true);
    };

    const handleEdit = (doc: Document) => {
        setCurrentDocument(doc);
        setIsModalOpen(true);
    };

    const handleDelete = async (docId: string) => {
        if (window.confirm('Are you sure you want to delete this document record?')) {
            await deleteDocument(docId);
        }
    };

    const handleSave = async (docData: Omit<Document, 'id' | 'dateIssued'> | Document) => {
        setIsSaving(true);
        if ('id' in docData) {
            await updateDocument(docData as Document);
        } else {
            await addDocument(docData as Omit<Document, 'id' | 'dateIssued'>);
        }
        setIsSaving(false);
        setIsModalOpen(false);
    };

    const getDocumentContent = (doc: Document) => {
        const issuedDate = new Date(doc.dateIssued).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        
        switch(doc.documentType) {
            case DocumentType.BARANGAY_CLEARANCE:
                return `
                    <h2 class="document-title">BARANGAY CLEARANCE</h2>
                    <p class="salutation">TO WHOM IT MAY CONCERN:</p>
                    <p class="body-text">
                        This is to certify that <strong>${doc.residentName.toUpperCase()}</strong>, of legal age, Filipino, and a bonafide resident of this barangay, 
                        is a person of good moral character and has no derogatory record on file in this office.
                    </p>
                    <p class="body-text">
                        This clearance is issued upon the request of the above-named person for the purpose of <strong>${doc.purpose}</strong> and for whatever legal purpose it may serve.
                    </p>
                    <p class="issued-text">Issued this ${issuedDate} at Barangay Dumlog, Talisay City, Cebu.</p>
                `;
            case DocumentType.CERTIFICATE_OF_RESIDENCY:
                return `
                    <h2 class="document-title">CERTIFICATE OF RESIDENCY</h2>
                    <p class="salutation">TO WHOM IT MAY CONCERN:</p>
                    <p class="body-text">
                        This is to certify that <strong>${doc.residentName.toUpperCase()}</strong>, of legal age, is a permanent resident of Barangay Dumlog, Talisay City, Cebu.
                    </p>
                     <p class="body-text">
                        This certification is issued upon the request of the interested party for <strong>${doc.purpose}</strong>.
                    </p>
                    <p class="issued-text">Issued this ${issuedDate} at Barangay Dumlog, Talisay City, Cebu.</p>
                `;
            case DocumentType.BUSINESS_PERMIT:
                 return `
                    <h2 class="document-title">BARANGAY PERMIT TO OPERATE BUSINESS</h2>
                    <p class="salutation">TO WHOM IT MAY CONCERN:</p>
                    <p class="body-text">
                        Permission is hereby granted to <strong>${doc.residentName.toUpperCase()}</strong> to operate a business known as <strong>"${doc.purpose}"</strong> located within the jurisdiction of this barangay.
                    </p>
                     <p class="body-text">
                        This permit is issued in accordance with the provisions of the Local Government Code of 1919 and is subject to all existing laws, rules, and regulations. This permit is valid until the end of the current fiscal year and must be renewed annually.
                    </p>
                    <p class="issued-text">Issued this ${issuedDate} at Barangay Dumlog, Talisay City, Cebu.</p>
                `;
            default:
                return `<p>Document type not supported for printing.</p>`;
        }
    };

    const handlePrintDocument = (doc: Document) => {
        const printContent = `
            <html>
                <head>
                    <title>${doc.documentType} - ${doc.residentName}</title>
                    <style>
                        body { font-family: 'Georgia', 'Times New Roman', Times, serif; margin: 0; padding: 2rem; color: #000; display: flex; flex-direction: column; align-items: center; background-color: #fdfdfd; }
                        .print-container { max-width: 8.5in; width: 100%; padding: 0.5in; box-sizing: border-box; }
                        .header { text-align: center; line-height: 1.3; margin-bottom: 1rem; position: relative; }
                        .header-logos { display: flex; justify-content: space-around; align-items: center; margin-bottom: 1rem; }
                        .header-logos img { height: 90px; }
                        .header-text p { margin: 0; font-size: 11pt; }
                        .header-text strong { font-size: 12pt; }
                        .header-rule { border-bottom: 2px solid #333; margin-top: 1rem; margin-bottom: 3rem; }
                        .document-title { font-weight: bold; font-size: 18pt; margin: 2rem 0; text-align: center; text-transform: uppercase; letter-spacing: 2px; }
                        .salutation { margin-top: 2rem; font-size: 12pt; }
                        .body-text { text-indent: 40px; text-align: justify; line-height: 2; font-size: 12pt; }
                        .issued-text { margin-top: 2rem; text-indent: 40px; text-align: justify; line-height: 2; font-size: 12pt; }
                        .footer-container { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 6rem; }
                        .seal-placeholder { border: 2px dashed #ccc; border-radius: 50%; width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; text-align: center; font-size: 10pt; color: #999; }
                        .signature-area { text-align: center; }
                        .signature-line { font-weight: bold; text-transform: uppercase; font-size: 11pt; margin-top: 60px; }
                        .captain-title { font-size: 11pt; }
                        .control-number { position: absolute; top: 0; right: 0; font-family: monospace; font-size: 9pt; color: #555; }
                        .print-button-container { position: fixed; top: 20px; right: 20px; z-index: 100; }
                        .print-button { padding: 10px 20px; background-color: #0D1B2A; color: white; border: none; border-radius: 5px; cursor: pointer; font-family: sans-serif; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
                        @media print {
                            .print-button-container { display: none; }
                            body { padding: 0; background-color: #fff; }
                            .print-container { padding: 0.5in; }
                        }
                    </style>
                </head>
                <body>
                    <div class="print-button-container">
                        <button class="print-button" onclick="window.print()">Print / Download as PDF</button>
                    </div>
                    <div class="print-container">
                        <div class="header">
                            <span class="control-number">Control No: ${doc.id.toUpperCase()}</span>
                            <div class="header-logos">
                                <img src="https://drive.google.com/uc?export=view&id=1Tt9KISpdbp5LBjqC4Kc6nNEoTu4JAu1s" alt="Talisay City Seal" />
                                <div class="header-text">
                                    <p>Republic of the Philippines</p>
                                    <p>Province of Cebu</p>
                                    <p>City of Talisay</p>
                                    <p><strong>BARANGAY DUMLOG</strong></p>
                                </div>
                                <img src="https://drive.google.com/uc?export=view&id=1dLPeGzBamRdsPQGbSBlV7pdInhCVRwGp" alt="Barangay Dumlog Seal" />
                            </div>
                            <p><strong>OFFICE OF THE BARANGAY CAPTAIN</strong></p>
                        </div>
                        <div class="header-rule"></div>

                        ${getDocumentContent(doc)}

                        <div class="footer-container">
                             <div class="seal-placeholder">
                                Not valid without BARANGAY SEAL
                            </div>
                            <div class="signature-area">
                                <p class="signature-line">HON. NELSON ABELLANA</p>
                                <p class="captain-title">Barangay Captain</p>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        `;
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.focus();
        } else {
            alert('Popup blocked! Please allow popups for this site to print the document.');
        }
    };
    
    const filteredDocuments = useMemo(() => {
        if (!searchTerm) return documents;
        return documents.filter(d => 
            `${d.residentName} ${d.documentType} ${d.purpose}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [documents, searchTerm]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-bms-text">Document Processing Command</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard title="Total Issued" value={documentStats.total} icon={<DocumentIcon className="w-8 h-8" />} />
                <StatCard title="Pending Requests" value={documentStats.pending} icon={<ClockIcon className="w-8 h-8" />} color="magenta" />
                <StatCard title="Approved This Month" value={documentStats.approvedThisMonth} icon={<ApprovedIcon className="w-8 h-8" />} />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
                 <h3 className="text-xl font-bold text-bms-text">Document Issuance Log</h3>
                 <div className="flex items-center gap-4 w-full md:w-auto">
                    <input 
                        type="text"
                        placeholder="Search documents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-64 bg-bms-primary border border-bms-tertiary rounded-md p-2 text-sm text-bms-text focus:outline-none focus:ring-2 focus:ring-bms-cyan/50"
                    />
                    <Button onClick={handleAddNew} icon={<PlusIcon className="w-4 h-4" />}>
                        Issue Document
                    </Button>
                </div>
            </div>
            
            {isLoading && documents.length === 0 ? (
                 <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-4 border-bms-cyan/50 border-t-bms-cyan rounded-full animate-spin"></div>
                    <p className="ml-4 text-bms-accent">Loading document records...</p>
                </div>
            ) : filteredDocuments.length > 0 ? (
                <DocumentTable documents={filteredDocuments} onEdit={handleEdit} onDelete={handleDelete} onPrint={handlePrintDocument} />
            ) : (
                <div className="text-center py-16 bg-bms-secondary/30 rounded-lg">
                    <h3 className="text-xl font-semibold text-bms-text">No Documents Found</h3>
                    <p className="text-bms-accent mt-2">No records match your search criteria, or no documents have been issued.</p>
                </div>
            )}

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title={currentDocument ? 'Edit Document' : 'Issue New Document'}
            >
                <DocumentForm 
                    document={currentDocument}
                    onSave={handleSave}
                    onClose={() => setIsModalOpen(false)}
                    isSaving={isSaving}
                />
            </Modal>
        </div>
    );
};

export default DocumentsModule;