import React, { useState, useMemo } from 'react';
import { useDocuments } from '../../hooks/useDocuments';
import { Document, DocumentType } from '../../types';
import DocumentTable from './DocumentTable';
import DocumentForm from './DocumentForm';
import Modal from '../common/Modal';
import Button from '../common/forms/Button';
import PlusIcon from '../icons/PlusIcon';

const DocumentsModule: React.FC = () => {
    const { documents, isLoading, addDocument, updateDocument, deleteDocument } = useDocuments();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

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
                        This permit is issued in accordance with the provisions of the Local Government Code of 1991 and is subject to all existing laws, rules, and regulations. This permit is valid until the end of the current fiscal year and must be renewed annually.
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
                        body { font-family: 'Times New Roman', Times, serif; margin: 0; padding: 2rem; color: #000; display: flex; flex-direction: column; align-items: center; }
                        .print-container { max-width: 8.5in; width: 100%; }
                        .header { text-align: center; line-height: 1.2; margin-bottom: 3rem; }
                        .header p { margin: 0; }
                        .document-title { font-weight: bold; font-size: 1.5rem; margin: 2rem 0; text-align: center; text-transform: uppercase; }
                        .salutation { margin-top: 2rem; }
                        .body-text { text-indent: 40px; text-align: justify; line-height: 1.8; font-size: 1.1rem; }
                        .issued-text { margin-top: 2rem; text-indent: 40px; text-align: justify; line-height: 1.8; font-size: 1.1rem; }
                        .footer { margin-top: 5rem; text-align: right; }
                        .signature-line { font-weight: bold; text-transform: uppercase; }
                        .print-button-container { position: fixed; top: 20px; right: 20px; }
                        .print-button { padding: 10px 20px; background-color: #0D1B2A; color: white; border: none; border-radius: 5px; cursor: pointer; font-family: sans-serif; }
                        @media print {
                            .print-button-container { display: none; }
                            body { padding: 0.5in; }
                        }
                    </style>
                </head>
                <body>
                    <div class="print-button-container">
                        <button class="print-button" onclick="window.print()">Print / Download as PDF</button>
                    </div>
                    <div class="print-container">
                        <div class="header">
                            <p>Republic of the Philippines</p>
                            <p>Province of Cebu</p>
                            <p>City of Talisay</p>
                            <p><strong>BARANGAY DUMLOG</strong></p>
                            <br/>
                            <p><strong>OFFICE OF THE BARANGAY CAPTAIN</strong></p>
                        </div>

                        ${getDocumentContent(doc)}

                        <div class="footer">
                            <p>_________________________</p>
                            <p class="signature-line">Cmdr. Alex Reyes</p>
                            <p>Barangay Captain</p>
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
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                 <h2 className="text-2xl font-bold text-bms-text">Document Processing</h2>
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