import React from 'react';
import { Transaction, TransactionType } from '../../types';
import EditIcon from '../icons/EditIcon';
import DeleteIcon from '../icons/DeleteIcon';

interface FinanceTableProps {
    transactions: Transaction[];
    onEdit: (txn: Transaction) => void;
    onDelete: (txnId: string) => void;
}

const FinanceTable: React.FC<FinanceTableProps> = ({ transactions, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto bg-bms-secondary/50 rounded-lg border border-bms-tertiary/50">
            <table className="min-w-full divide-y divide-bms-tertiary/50">
                <thead className="bg-bms-secondary">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-bms-accent uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-bms-accent uppercase tracking-wider">Description</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-bms-accent uppercase tracking-wider">Category</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-mono font-medium text-bms-accent uppercase tracking-wider">Amount</th>
                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-bms-tertiary/50">
                    {transactions.map((txn) => (
                        <tr key={txn.id} className="hover:bg-bms-tertiary/20 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-bms-accent">{new Date(txn.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-semibold text-bms-text">{txn.description}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-bms-accent">{txn.category}</td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-mono text-right font-semibold ${txn.type === TransactionType.INCOME ? 'text-bms-cyan' : 'text-bms-magenta'}`}>
                                {txn.type === TransactionType.EXPENSE && '-'}
                                ₱{txn.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end space-x-3">
                                    <button onClick={() => onEdit(txn)} className="text-bms-cyan hover:text-bms-text" title="Edit Transaction">
                                        <EditIcon className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => onDelete(txn.id)} className="text-bms-magenta hover:text-white" title="Delete Transaction">
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

export default FinanceTable;
