import { useState, useEffect } from 'react';
import { Transaction, TransactionType } from '../types';

const initialTransactions: Transaction[] = [
  {
    id: 'txn-001',
    date: new Date('2023-11-01T10:00:00Z').toISOString(),
    description: 'Payment for Barangay Clearance',
    type: TransactionType.INCOME,
    amount: 150.00,
    category: 'Document Fees',
  },
  {
    id: 'txn-002',
    date: new Date('2023-11-03T14:20:00Z').toISOString(),
    description: 'Office Supplies Purchase',
    type: TransactionType.EXPENSE,
    amount: 550.75,
    category: 'Office Supplies',
  },
  {
    id: 'txn-003',
    date: new Date('2023-11-05T11:00:00Z').toISOString(),
    description: 'Community Hall Rental',
    type: TransactionType.INCOME,
    amount: 1500.00,
    category: 'Rental Fees',
  },
  {
    id: 'txn-004',
    date: new Date('2023-11-10T16:00:00Z').toISOString(),
    description: 'Electricity Bill Payment',
    type: TransactionType.EXPENSE,
    amount: 2500.00,
    category: 'Utilities',
  },
];

const API_LATENCY = 500;

export const useFinance = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setTransactions(initialTransactions);
            setIsLoading(false);
        }, API_LATENCY);
    }, []);

    const addTransaction = async (txnData: Omit<Transaction, 'id'>): Promise<void> => {
        setIsLoading(true);
        setError(null);
        return new Promise((resolve) => {
            setTimeout(() => {
                const newTxn: Transaction = {
                    ...txnData,
                    id: `txn-${new Date().getTime()}`,
                };
                setTransactions(prev => [newTxn, ...prev].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
                setIsLoading(false);
                resolve();
            }, API_LATENCY);
        });
    };

    const updateTransaction = async (txnData: Transaction): Promise<void> => {
        setIsLoading(true);
        setError(null);
        return new Promise((resolve) => {
            setTimeout(() => {
                setTransactions(prev => prev.map(t => t.id === txnData.id ? txnData : t));
                setIsLoading(false);
                resolve();
            }, API_LATENCY);
        });
    };

    const deleteTransaction = async (txnId: string): Promise<void> => {
        setIsLoading(true);
        setError(null);
        return new Promise((resolve) => {
           setTimeout(() => {
                setTransactions(prev => prev.filter(t => t.id !== txnId));
                setIsLoading(false);
                resolve();
           }, API_LATENCY);
        });
    };
    
    return {
        transactions,
        isLoading,
        error,
        addTransaction,
        updateTransaction,
        deleteTransaction,
    };
};
