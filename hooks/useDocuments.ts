import { useState, useEffect } from 'react';
import { Document, DocumentType } from '../types';

const initialDocuments: Document[] = [
  {
    id: 'doc-001',
    residentId: 'res-001',
    residentName: 'Juan Dela Cruz',
    documentType: DocumentType.BARANGAY_CLEARANCE,
    purpose: 'For local employment',
    dateIssued: new Date('2023-10-15T09:00:00Z').toISOString(),
    status: 'Approved',
  },
  {
    id: 'doc-002',
    residentId: 'res-002',
    residentName: 'Maria Santos',
    documentType: DocumentType.CERTIFICATE_OF_RESIDENCY,
    purpose: 'Bank requirement',
    dateIssued: new Date('2023-10-16T11:20:00Z').toISOString(),
    status: 'Approved',
  },
  {
    id: 'doc-003',
    residentId: 'res-005',
    residentName: 'Pedro Gonzales Jr.',
    documentType: DocumentType.BUSINESS_PERMIT,
    purpose: 'Sari-sari store',
    dateIssued: new Date().toISOString(),
    status: 'Pending',
  },
];

const API_LATENCY = 500;

export const useDocuments = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setDocuments(initialDocuments);
            setIsLoading(false);
        }, API_LATENCY);
    }, []);

    const addDocument = async (docData: Omit<Document, 'id' | 'dateIssued'>): Promise<void> => {
        setIsLoading(true);
        setError(null);
        return new Promise((resolve) => {
            setTimeout(() => {
                const newDoc: Document = {
                    ...docData,
                    id: `doc-${new Date().getTime()}`,
                    dateIssued: new Date().toISOString(),
                };
                setDocuments(prev => [newDoc, ...prev]);
                setIsLoading(false);
                resolve();
            }, API_LATENCY);
        });
    };

    const updateDocument = async (docData: Document): Promise<void> => {
        setIsLoading(true);
        setError(null);
        return new Promise((resolve) => {
            setTimeout(() => {
                setDocuments(prev => prev.map(d => d.id === docData.id ? docData : d));
                setIsLoading(false);
                resolve();
            }, API_LATENCY);
        });
    };

    const deleteDocument = async (docId: string): Promise<void> => {
        setIsLoading(true);
        setError(null);
        return new Promise((resolve) => {
           setTimeout(() => {
                setDocuments(prev => prev.filter(d => d.id !== docId));
                setIsLoading(false);
                resolve();
           }, API_LATENCY);
        });
    };

    return {
        documents,
        isLoading,
        error,
        addDocument,
        updateDocument,
        deleteDocument,
    };
};
