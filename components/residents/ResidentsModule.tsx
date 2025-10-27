import React, { useState, useMemo } from 'react';
import { useResidents } from '../../hooks/useResidents';
import { Resident, Gender } from '../../types';
import ResidentTable from './ResidentTable';
import ResidentForm from './ResidentForm';
import Modal from '../common/Modal';
import Button from '../common/forms/Button';
import PlusIcon from '../icons/PlusIcon';
import StatCard from '../common/StatCard';
import ResidentsIcon from '../icons/ResidentsIcon';
import MaleIcon from '../icons/MaleIcon';
import FemaleIcon from '../icons/FemaleIcon';
import VoteIcon from '../icons/VoteIcon';
import HomeIcon from '../icons/HomeIcon';


const ResidentsModule: React.FC = () => {
    const { residents, isLoading, addResident, updateResident, deleteResident } = useResidents();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [currentResident, setCurrentResident] = useState<Resident | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const residentStats = useMemo(() => {
        const total = residents.length;
        const males = residents.filter(r => r.gender === Gender.MALE).length;
        const females = residents.filter(r => r.gender === Gender.FEMALE).length;
        const voters = residents.filter(r => r.isVoter).length;
        const households = new Set(residents.map(r => r.householdId)).size;
        return { total, males, females, voters, households };
    }, [residents]);

    const handleAddNew = () => {
        setCurrentResident(null);
        setIsModalOpen(true);
    };

    const handleEdit = (resident: Resident) => {
        setCurrentResident(resident);
        setIsModalOpen(true);
    };

    const handleDelete = async (residentId: string) => {
        if (window.confirm('Are you sure you want to delete this resident record? This action cannot be undone.')) {
            await deleteResident(residentId);
        }
    };

    const handleSave = async (residentData: Omit<Resident, 'id' | 'dateRegistered'> | Resident) => {
        setIsSaving(true);
        if ('id' in residentData) {
            await updateResident(residentData as Resident);
        } else {
            await addResident(residentData);
        }
        setIsSaving(false);
        setIsModalOpen(false);
    };
    
    const filteredResidents = useMemo(() => {
        if (!searchTerm) return residents;
        return residents.filter(r => 
            `${r.firstName} ${r.lastName} ${r.address} ${r.email}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [residents, searchTerm]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-bms-text">Residents Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Residents" value={residentStats.total} icon={<ResidentsIcon className="w-8 h-8" />} color="cyan" />
                <StatCard title="Registered Voters" value={residentStats.voters} icon={<VoteIcon className="w-8 h-8" />} color="magenta" />
                <StatCard title="Total Households" value={residentStats.households} icon={<HomeIcon className="w-8 h-8" />} color="cyan" />
                <div className="bg-bms-secondary/50 p-4 rounded-lg border border-bms-tertiary/50 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-bms-accent font-mono uppercase">Gender Ratio</p>
                        <div className="flex items-baseline space-x-4">
                           <p className="text-3xl font-bold text-bms-text">{residentStats.males}</p>
                           <p className="text-3xl font-bold text-bms-text">{residentStats.females}</p>
                        </div>
                    </div>
                     <div className="flex space-x-2">
                        <MaleIcon className="w-8 h-8 text-bms-cyan" />
                        <FemaleIcon className="w-8 h-8 text-bms-magenta" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
                 <h3 className="text-xl font-bold text-bms-text">Resident Database</h3>
                 <div className="flex items-center gap-4 w-full md:w-auto">
                    <input 
                        type="text"
                        placeholder="Search residents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-64 bg-bms-primary border border-bms-tertiary rounded-md p-2 text-sm text-bms-text focus:outline-none focus:ring-2 focus:ring-bms-cyan/50"
                    />
                    <Button onClick={handleAddNew} icon={<PlusIcon className="w-4 h-4" />}>
                        Add Resident
                    </Button>
                </div>
            </div>
            
            {isLoading && residents.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-4 border-bms-cyan/50 border-t-bms-cyan rounded-full animate-spin"></div>
                    <p className="ml-4 text-bms-accent">Loading resident data...</p>
                </div>
            ) : filteredResidents.length > 0 ? (
                <ResidentTable residents={filteredResidents} onEdit={handleEdit} onDelete={handleDelete} />
            ) : (
                <div className="text-center py-16 bg-bms-secondary/30 rounded-lg">
                    <h3 className="text-xl font-semibold text-bms-text">No Residents Found</h3>
                    <p className="text-bms-accent mt-2">No records match your search criteria, or the database is empty.</p>
                </div>
            )}

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title={currentResident ? 'Edit Resident Record' : 'Add New Resident'}
            >
                <ResidentForm 
                    resident={currentResident}
                    onSave={handleSave}
                    onClose={() => setIsModalOpen(false)}
                    isSaving={isSaving}
                />
            </Modal>
        </div>
    );
};

export default ResidentsModule;