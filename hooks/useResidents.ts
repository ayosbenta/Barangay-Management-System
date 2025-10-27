
import { useState, useEffect } from 'react';
import { Resident, Gender, CivilStatus } from '../types';

// Mock data based on typical Filipino names and details
const initialResidents: Resident[] = [
  {
    id: 'res-001',
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    birthDate: '1990-05-15',
    gender: Gender.MALE,
    civilStatus: CivilStatus.MARRIED,
    address: '123 Rizal St.',
    contactNumber: '09171234567',
    email: 'juan.delacruz@example.com',
    householdId: 'hh-001',
    isVoter: true,
    dateRegistered: new Date('2022-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'res-002',
    firstName: 'Maria',
    lastName: 'Santos',
    middleName: 'Clara',
    birthDate: '1992-08-22',
    gender: Gender.FEMALE,
    civilStatus: CivilStatus.SINGLE,
    address: '456 Bonifacio Ave.',
    contactNumber: '09187654321',
    householdId: 'hh-002',
    isVoter: true,
    dateRegistered: new Date('2022-02-20T11:30:00Z').toISOString(),
  },
  {
    id: 'res-003',
    firstName: 'Andres',
    lastName: 'Garcia',
    birthDate: '1985-11-30',
    gender: Gender.MALE,
    civilStatus: CivilStatus.WIDOWED,
    address: '789 Mabini Blvd.',
    contactNumber: '09201112233',
    email: 'andres.garcia@example.com',
    householdId: 'hh-003',
    isVoter: false,
    dateRegistered: new Date('2023-03-05T14:00:00Z').toISOString(),
  },
   {
    id: 'res-004',
    firstName: 'Elena',
    lastName: 'Reyes',
    birthDate: '2001-02-14',
    gender: Gender.FEMALE,
    civilStatus: CivilStatus.SINGLE,
    address: '101 Aguinaldo Highway',
    contactNumber: '09215556677',
    householdId: 'hh-004',
    isVoter: true,
    dateRegistered: new Date('2023-04-12T09:00:00Z').toISOString(),
  },
   {
    id: 'res-005',
    firstName: 'Pedro',
    lastName: 'Gonzales',
    middleName: 'San',
    suffix: 'Jr.',
    birthDate: '1978-07-01',
    gender: Gender.MALE,
    civilStatus: CivilStatus.MARRIED,
    address: '222 Luna St.',
    contactNumber: '09228889900',
    householdId: 'hh-001',
    isVoter: true,
    dateRegistered: new Date('2023-05-18T16:20:00Z').toISOString(),
  }
];

// Simulate API latency
const API_LATENCY = 500;

export const useResidents = () => {
    const [residents, setResidents] = useState<Resident[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simulate fetching data on mount
        setTimeout(() => {
            setResidents(initialResidents);
            setIsLoading(false);
        }, API_LATENCY);
    }, []);

    const addResident = async (residentData: Omit<Resident, 'id' | 'dateRegistered'>): Promise<void> => {
        setIsLoading(true);
        setError(null);
        return new Promise((resolve) => {
            setTimeout(() => {
                const newResident: Resident = {
                    ...residentData,
                    id: `res-${new Date().getTime()}`, // simple unique id
                    dateRegistered: new Date().toISOString(),
                };
                setResidents(prev => [newResident, ...prev]);
                setIsLoading(false);
                resolve();
            }, API_LATENCY);
        });
    };

    const updateResident = async (residentData: Resident): Promise<void> => {
         setIsLoading(true);
         setError(null);
         return new Promise((resolve) => {
            setTimeout(() => {
                setResidents(prev => prev.map(r => r.id === residentData.id ? residentData : r));
                setIsLoading(false);
                resolve();
            }, API_LATENCY);
         });
    };

    const deleteResident = async (residentId: string): Promise<void> => {
        setIsLoading(true);
        setError(null);
        return new Promise((resolve) => {
           setTimeout(() => {
                setResidents(prev => prev.filter(r => r.id !== residentId));
                setIsLoading(false);
                resolve();
           }, API_LATENCY);
        });
    };
    
    return {
        residents,
        isLoading,
        error,
        addResident,
        updateResident,
        deleteResident,
    };
};
