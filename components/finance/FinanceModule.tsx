import React, { useState, useMemo } from 'react';
import { useFinance } from '../../hooks/useFinance';
import { Transaction, TransactionType } from '../../types';
import FinanceTable from './FinanceTable';
import FinanceForm from './FinanceForm';
import Modal from '../common/Modal';
import Button from '../common/forms/Button';
import PlusIcon from '../icons/PlusIcon';

const FinanceModule: React.FC = () => {
    const { transactions, isLoading, addTransaction, updateTransaction, deleteTransaction } = useFinance();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleAddNew = () => {
        setCurrentTransaction(null);
        setIsModalOpen(true);
    };

    const handleEdit = (txn: Transaction) => {
        setCurrentTransaction(txn);
        setIsModalOpen(true);
    };

    const handleDelete = async (txnId: string) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            await deleteTransaction(txnId);
        }
    };

    const handleSave = async (txnData: Omit<Transaction, 'id'> | Transaction) => {
        setIsSaving(true);
        if ('id' in txnData) {
            await updateTransaction(txnData as Transaction);
        } else {
            await addTransaction(txnData as Omit<Transaction, 'id'>);
        }
        setIsSaving(false);
        setIsModalOpen(false);
    };
    
    const { filteredTransactions, totalIncome, totalExpense, balance } = useMemo(() => {
        let totalIncome = 0;
        let totalExpense = 0;
        
        transactions.forEach(t => {
            if (t.type === TransactionType.INCOME) {
                totalIncome += t.amount;
            } else {
                totalExpense += t.amount;
            }
        });

        const balance = totalIncome - totalExpense;

        const filtered = searchTerm
            ? transactions.filter(t => `${t.description} ${t.category}`.toLowerCase().includes(searchTerm.toLowerCase()))
            : transactions;
            
        return { filteredTransactions: filtered, totalIncome, totalExpense, balance };
    }, [transactions, searchTerm]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                 <h2 className="text-2xl font-bold text-bms-text">Finance & Budget</h2>
                 <div className="flex items-center gap-4 w-full md:w-auto">
                    <input 
                        type="text"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-64 bg-bms-primary border border-bms-tertiary rounded-md p-2 text-sm text-bms-text focus:outline-none focus:ring-2 focus:ring-bms-cyan/50"
                    />
                    <Button onClick={handleAddNew} icon={<PlusIcon className="w-4 h-4" />}>
                        Add Transaction
                    </Button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-bms-secondary/50 p-4 rounded-lg border border-bms-tertiary/50">
                    <p className="text-sm text-bms-accent">Total Income</p>
                    <p className="text-2xl font-bold text-bms-cyan">₱{totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                 <div className="bg-bms-secondary/50 p-4 rounded-lg border border-bms-tertiary/50">
                    <p className="text-sm text-bms-accent">Total Expense</p>
                    <p className="text-2xl font-bold text-bms-magenta">₱{totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                 <div className="bg-bms-secondary/50 p-4 rounded-lg border border-bms-tertiary/50">
                    <p className="text-sm text-bms-accent">Current Balance</p>
                    <p className={`text-2xl font-bold ${balance >= 0 ? 'text-bms-text' : 'text-bms-magenta'}`}>₱{balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
            </div>

            {isLoading && transactions.length === 0 ? (
                 <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-4 border-bms-cyan/50 border-t-bms-cyan rounded-full animate-spin"></div>
                    <p className="ml-4 text-bms-accent">Loading financial records...</p>
                </div>
            ) : filteredTransactions.length > 0 ? (
                <FinanceTable transactions={filteredTransactions} onEdit={handleEdit} onDelete={handleDelete} />
            ) : (
                <div className="text-center py-16 bg-bms-secondary/30 rounded-lg">
                    <h3 className="text-xl font-semibold text-bms-text">No Transactions Found</h3>
                    <p className="text-bms-accent mt-2">No records match your search criteria or the ledger is empty.</p>
                </div>
            )}

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title={currentTransaction ? 'Edit Transaction' : 'Add New Transaction'}
            >
                <FinanceForm
                    transaction={currentTransaction}
                    onSave={handleSave}
                    onClose={() => setIsModalOpen(false)}
                    isSaving={isSaving}
                />
            </Modal>
        </div>
    );
};

export default FinanceModule;
