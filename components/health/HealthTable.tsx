import React from 'react';
import { HealthRecord } from '../../types';
import EditIcon from '../icons/EditIcon';
import DeleteIcon from '../icons/DeleteIcon';

interface HealthTableProps {
    records: HealthRecord[];
    onEdit: (record: HealthRecord) => void;
    onDelete: (recordId: string) => void;
}

const HealthTable: React.FC<HealthTableProps> = ({ records, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto bg-bms-secondary/50 rounded-lg border border-bms-tertiary/50">
            <table className="min-w-full divide-y divide-bms-tertiary/50">
                <thead className="bg-bms-secondary">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-bms-accent uppercase tracking-wider">Patient Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-bms-accent uppercase tracking-wider">Checkup Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-bms-accent uppercase tracking-wider">Diagnosis</th>
                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-bms-tertiary/50">
                    {records.map((record) => (
                        <tr key={record.id} className="hover:bg-bms-tertiary/20 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-bms-text">{record.residentName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-bms-accent">{new Date(record.checkupDate).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-bms-accent">{record.diagnosis}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end space-x-3">
                                    <button onClick={() => onEdit(record)} className="text-bms-cyan hover:text-bms-text" title="Edit Record">
                                        <EditIcon className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => onDelete(record.id)} className="text-bms-magenta hover:text-white" title="Delete Record">
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

export default HealthTable;
