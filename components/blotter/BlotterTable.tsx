import React from 'react';
import { LuponCase, CaseStatus } from '../../types';
import EditIcon from '../icons/EditIcon';
import DeleteIcon from '../icons/DeleteIcon';
import PrintIcon from '../icons/PrintIcon';

interface BlotterTableProps {
    cases: LuponCase[];
    onEdit: (record: LuponCase) => void;
    onDelete: (recordId: string) => void;
    onPrint: (record: LuponCase) => void;
}

const BlotterTable: React.FC<BlotterTableProps> = ({ cases, onEdit, onDelete, onPrint }) => {
    
    const getStatusBadge = (status: CaseStatus) => {
        switch (status) {
            case CaseStatus.FILED:
                return 'bg-blue-500/20 text-blue-400';
            case CaseStatus.MEDIATION:
                return 'bg-yellow-500/20 text-yellow-400';
            case CaseStatus.CONCILIATION:
                return 'bg-orange-500/20 text-orange-400';
            case CaseStatus.SETTLED:
                return 'bg-green-500/20 text-green-400';
            case CaseStatus.DISMISSED:
                return 'bg-gray-500/20 text-gray-400';
            case CaseStatus.CERTIFIED_FOR_COURT:
                return 'bg-red-500/20 text-red-400';
        }
    };

    return (
        <div className="overflow-x-auto bg-bms-secondary/50 rounded-lg border border-bms-tertiary/50">
            <table className="min-w-full divide-y divide-bms-tertiary/50">
                <thead className="bg-bms-secondary">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-bms-accent uppercase tracking-wider">Case Details</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-bms-accent uppercase tracking-wider">Complainant</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-bms-accent uppercase tracking-wider">Respondent</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-bms-accent uppercase tracking-wider">Date Filed</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-bms-accent uppercase tracking-wider">Status</th>
                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-bms-tertiary/50">
                    {cases.map((caseRecord) => (
                        <tr key={caseRecord.id} className="hover:bg-bms-tertiary/20 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-semibold text-bms-text">{caseRecord.natureOfComplaint}</div>
                                <div className="text-xs font-mono text-bms-accent">{caseRecord.caseNumber}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-bms-accent">{caseRecord.complainant}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-bms-accent">{caseRecord.respondent}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-bms-accent">{new Date(caseRecord.dateFiled).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(caseRecord.status)}`}>
                                    {caseRecord.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end space-x-3">
                                    <button onClick={() => onPrint(caseRecord)} className="text-bms-accent hover:text-bms-text" title="Print Case File">
                                        <PrintIcon className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => onEdit(caseRecord)} className="text-bms-cyan hover:text-bms-text" title="Edit Case">
                                        <EditIcon className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => onDelete(caseRecord.id)} className="text-bms-magenta hover:text-white" title="Delete Case">
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

export default BlotterTable;
