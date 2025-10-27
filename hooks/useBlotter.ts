import { useState, useEffect } from 'react';
import { LuponCase, CaseStatus } from '../types';

const initialLuponCases: LuponCase[] = [
  {
    id: 'kp-case-001',
    caseNumber: 'BMS-2023-001',
    complainant: 'Maria Santos',
    respondent: 'John Doe',
    natureOfComplaint: 'Unpaid Debt',
    dateFiled: new Date('2023-11-01T15:30:00Z').toISOString(),
    narrative: 'Respondent failed to pay a debt of PHP 5,000.00 which was due last month.',
    status: CaseStatus.SETTLED,
    actionTaken: 'First mediation session held. Parties agreed to a payment plan.',
    settlementDetails: 'Respondent to pay PHP 1,000.00 monthly for 5 months starting December 2023.'
  },
  {
    id: 'kp-case-002',
    caseNumber: 'BMS-2023-002',
    complainant: 'Andres Garcia',
    respondent: 'Jane Smith',
    natureOfComplaint: 'Public Disturbance',
    dateFiled: new Date('2023-11-05T22:00:00Z').toISOString(),
    narrative: 'Respondent was playing loud music late at night, disturbing the neighbors.',
    status: CaseStatus.MEDIATION,
    actionTaken: 'Summons issued to both parties for a mediation hearing next week.',
  },
  {
    id: 'kp-case-003',
    caseNumber: 'BMS-2023-003',
    complainant: 'Juan Dela Cruz',
    respondent: 'Peter Jones',
    natureOfComplaint: 'Slight Physical Injuries',
    dateFiled: new Date('2023-11-10T08:00:00Z').toISOString(),
    narrative: 'A heated argument led to a physical altercation where the complainant sustained minor bruises.',
    status: CaseStatus.CERTIFIED_FOR_COURT,
    actionTaken: 'Mediation and Conciliation failed. Certificate to File Action was issued to the complainant.'
  },
];

const API_LATENCY = 500;

export const useLuponCases = () => {
    const [cases, setCases] = useState<LuponCase[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setCases(initialLuponCases);
            setIsLoading(false);
        }, API_LATENCY);
    }, []);

    const addCase = async (caseData: Omit<LuponCase, 'id'>): Promise<void> => {
        setIsLoading(true);
        setError(null);
        return new Promise((resolve) => {
            setTimeout(() => {
                const newCase: LuponCase = {
                    ...caseData,
                    id: `kp-case-${new Date().getTime()}`,
                };
                setCases(prev => [newCase, ...prev]);
                setIsLoading(false);
                resolve();
            }, API_LATENCY);
        });
    };

    const updateCase = async (caseData: LuponCase): Promise<void> => {
        setIsLoading(true);
        setError(null);
        return new Promise((resolve) => {
            setTimeout(() => {
                setCases(prev => prev.map(c => c.id === caseData.id ? caseData : c));
                setIsLoading(false);
                resolve();
            }, API_LATENCY);
        });
    };

    const deleteCase = async (caseId: string): Promise<void> => {
        setIsLoading(true);
        setError(null);
        return new Promise((resolve) => {
           setTimeout(() => {
                setCases(prev => prev.filter(c => c.id !== caseId));
                setIsLoading(false);
                resolve();
           }, API_LATENCY);
        });
    };
    
    return {
        cases,
        isLoading,
        error,
        addCase,
        updateCase,
        deleteCase,
    };
};