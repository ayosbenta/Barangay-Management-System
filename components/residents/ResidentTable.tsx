
import React from 'react';
import { Resident } from '../../types';
import EditIcon from '../icons/EditIcon';
import DeleteIcon from '../icons/DeleteIcon';

interface ResidentTableProps {
    residents: Resident[];
    onEdit: (resident: Resident) => void;
    onDelete: (residentId: string) => void;
}

const ResidentTable: React.FC<ResidentTableProps> = ({ residents, onEdit, onDelete }) => {
    
    const calculateAge = (birthDate: string) => {
        if (!birthDate) return 'N/A';
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const m = today.getMonth() - birthDateObj.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="overflow-x-auto bg-bms-secondary/50 rounded-lg border border-bms-tertiary/50">
            <table className="min-w-full divide-y divide-bms-tertiary/50">
                <thead className="bg-bms-secondary">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-bms-accent uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-bms-accent uppercase tracking-wider">Address</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-bms-accent uppercase tracking-wider">Age</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-bms-accent uppercase tracking-wider">Contact</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-bms-accent uppercase tracking-wider">Registered</th>
                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-bms-tertiary/50">
                    {residents.map((resident) => (
                        <tr key={resident.id} className="hover:bg-bms-tertiary/20 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-semibold text-bms-text">{`${resident.lastName}, ${resident.firstName} ${resident.middleName ? resident.middleName.charAt(0) + '.' : ''}`}</div>
                                <div className="text-xs text-bms-accent">{resident.email || 'No email'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-bms-accent">{resident.address}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-bms-accent">{calculateAge(resident.birthDate)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-bms-accent">{resident.contactNumber}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-bms-accent">{new Date(resident.dateRegistered).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end space-x-3">
                                    <button onClick={() => onEdit(resident)} className="text-bms-cyan hover:text-bms-text" title="Edit Resident">
                                        <EditIcon className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => onDelete(resident.id)} className="text-bms-magenta hover:text-white" title="Delete Resident">
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

export default ResidentTable;
