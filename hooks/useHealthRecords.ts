import { useState, useEffect } from 'react';
import { HealthRecord } from '../types';

const initialHealthRecords: HealthRecord[] = [
  {
    id: 'health-001',
    residentId: 'res-002',
    residentName: 'Maria Santos',
    checkupDate: new Date('2023-11-02T10:00:00Z').toISOString(),
    diagnosis: 'Common Cold',
    treatment: 'Prescribed Paracetamol and rest.',
    notes: 'Patient advised to drink plenty of fluids.',
  },
  {
    id: 'health-002',
    residentId: 'res-003',
    residentName: 'Andres Garcia',
    checkupDate: new Date('2023-11-08T14:30:00Z').toISOString(),
    diagnosis: 'Hypertension',
    treatment: 'Prescribed Amlodipine. Follow-up checkup in 2 weeks.',
    notes: 'Blood pressure was 140/90.',
  },
  {
    id: 'health-003',
    residentId: 'res-004',
    residentName: 'Elena Reyes',
    checkupDate: new Date('2023-11-12T09:15:00Z').toISOString(),
    diagnosis: 'Vaccination',
    treatment: 'Administered second dose of flu vaccine.',
  },
];

const API_LATENCY = 500;

export const useHealthRecords = () => {
    const [records, setRecords] = useState<HealthRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setRecords(initialHealthRecords);
            setIsLoading(false);
        }, API_LATENCY);
    }, []);

    const addRecord = async (recordData: Omit<HealthRecord, 'id'>): Promise<void> => {
        setIsLoading(true);
        setError(null);
        return new Promise((resolve) => {
            setTimeout(() => {
                const newRecord: HealthRecord = {
                    ...recordData,
                    id: `health-${new Date().getTime()}`,
                };
                setRecords(prev => [newRecord, ...prev]);
                setIsLoading(false);
                resolve();
            }, API_LATENCY);
        });
    };

    const updateRecord = async (recordData: HealthRecord): Promise<void> => {
        setIsLoading(true);
        setError(null);
        return new Promise((resolve) => {
            setTimeout(() => {
                setRecords(prev => prev.map(r => r.id === recordData.id ? recordData : r));
                setIsLoading(false);
                resolve();
            }, API_LATENCY);
        });
    };

    const deleteRecord = async (recordId: string): Promise<void> => {
        setIsLoading(true);
        setError(null);
        return new Promise((resolve) => {
           setTimeout(() => {
                setRecords(prev => prev.filter(r => r.id !== recordId));
                setIsLoading(false);
                resolve();
           }, API_LATENCY);
        });
    };
    
    return {
        records,
        isLoading,
        error,
        addRecord,
        updateRecord,
        deleteRecord,
    };
};
