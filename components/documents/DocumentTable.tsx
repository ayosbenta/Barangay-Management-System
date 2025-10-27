import React from 'react';
import { Document } from '../../types';
import EditIcon from '../icons/EditIcon';
import DeleteIcon from '../icons/DeleteIcon';
import PrintIcon from '../icons/PrintIcon';

interface DocumentTableProps {
    documents: Document[];
    onEdit: (doc: Document) => void;
    onDelete: (docId: string) => void;
    onPrint: (doc: Document) => void;
}

const DocumentTable: React.FC<DocumentTableProps> = ({ documents, onEdit, onDelete, onPrint }) => {
    
    const getStatusBadge = (status: 'Pending' | 'Approved' | 'Rejected') => {
        switch (status) {
            case 'Approved':
                return 'bg-green-500/20 text-green-400';
            case 'Pending':
                return 'bg-yellow-500/20 text-yellow-400';
            case 'Rejected':
                return 'bg-red-500/20 text-red-400';
        }
    };

    return (
        <div className="overflow-x-auto bg-bms-secondary/50 rounded-lg border border-bms-tertiary/50">
            <table className="min-w-full divide-y divide-bms-tertiary/50">
                <thead className="bg-bms-secondary">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-bms-accent uppercase tracking-wider">Document Type</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-bms-accent uppercase tracking-wider">Recipient</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-bms-accent uppercase tracking-wider">Date Issued</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-bms-accent uppercase tracking-wider">Status</th>
                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-bms-tertiary/50">
                    {documents.map((doc) => (
                        <tr key={doc.id} className="hover:bg-bms-tertiary/20 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-semibold text-bms-text">{doc.documentType}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-bms-accent">{doc.residentName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-bms-accent">{new Date(doc.dateIssued).toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(doc.status)}`}>
                                    {doc.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end space-x-3">
                                    <button onClick={() => onPrint(doc)} className="text-bms-accent hover:text-bms-text" title="Print Document">
                                        <PrintIcon className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => onEdit(doc)} className="text-bms-cyan hover:text-bms-text" title="Edit Document">
                                        <EditIcon className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => onDelete(doc.id)} className="text-bms-magenta hover:text-white" title="Delete Document">
                                        <DeleteIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DocumentTable;