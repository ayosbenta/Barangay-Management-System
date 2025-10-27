import React, { useState, useMemo } from 'react';
import { useHealthRecords } from '../../hooks/useHealthRecords';
import { HealthRecord } from '../../types';
import HealthTable from './HealthTable';
import HealthForm from './HealthForm';
import Modal from '../common/Modal';
import Button from '../common/forms/Button';
import PlusIcon from '../icons/PlusIcon';
import StatCard from '../common/StatCard';
import ClipboardListIcon from '../icons/ClipboardListIcon';
import CalendarClockIcon from '../icons/CalendarClockIcon';
import SyringeIcon from '../icons/SyringeIcon';
import HealthIcon from '../icons/HealthIcon';

const HealthModule: React.FC = () => {
    const { records, isLoading, addRecord, updateRecord, deleteRecord } = useHealthRecords();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<HealthRecord | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const healthStats = useMemo(() => {
        const total = records.length;
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentCheckups = records.filter(r => new Date(r.checkupDate) > thirtyDaysAgo).length;
        const vaccinations = records.filter(r => r.diagnosis.toLowerCase() === 'vaccination').length;
        return { total, recentCheckups, vaccinations };
    }, [records]);

    const handleAddNew = () => {
        setCurrentRecord(null);
        setIsModalOpen(true);
    };

    const handleEdit = (record: HealthRecord) => {
        setCurrentRecord(record);
        setIsModalOpen(true);
    };

    const handleDelete = async (recordId: string) => {
        if (window.confirm('Are you sure you want to delete this health record?')) {
            await deleteRecord(recordId);
        }
    };

    const handleSave = async (recordData: Omit<HealthRecord, 'id'> | HealthRecord) => {
        setIsSaving(true);
        if ('id' in recordData) {
            await updateRecord(recordData as HealthRecord);
        } else {
            await addRecord(recordData as Omit<HealthRecord, 'id'>);
        }
        setIsSaving(false);
        setIsModalOpen(false);
    };
    
    const filteredRecords = useMemo(() => {
        if (!searchTerm) return records;
        return records.filter(r => 
            `${r.residentName} ${r.diagnosis} ${r.treatment}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [records, searchTerm]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-bms-text">Health &amp; Wellness Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Records" value={healthStats.total} icon={<ClipboardListIcon className="w-8 h-8" />} color="cyan" />
                <StatCard title="Checkups (Last 30d)" value={healthStats.recentCheckups} icon={<CalendarClockIcon className="w-8 h-8" />} color="magenta" />
                <StatCard title="Vaccinations" value={healthStats.vaccinations} icon={<SyringeIcon className="w-8 h-8" />} color="cyan" />
                <StatCard title="Avg Checkups/Day" value={(healthStats.recentCheckups / 30).toFixed(1)} icon={<HealthIcon className="w-8 h-8" />} color="text" />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
                 <h3 className="text-xl font-bold text-bms-text">Health Center Records</h3>
                 <div className="flex items-center gap-4 w-full md:w-auto">
                    <input 
                        type="text"
                        placeholder="Search records..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-64 bg-bms-primary border border-bms-tertiary rounded-md p-2 text-sm text-bms-text focus:outline-none focus:ring-2 focus:ring-bms-cyan/50"
                    />
                    <Button onClick={handleAddNew} icon={<PlusIcon className="w-4 h-4" />}>
                        Add Record
                    </Button>
                </div>
            </div>
            
            {isLoading && records.length === 0 ? (
                 <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-4 border-bms-cyan/50 border-t-bms-cyan rounded-full animate-spin"></div>
                    <p className="ml-4 text-bms-accent">Loading health records...</p>
                </div>
            ) : filteredRecords.length > 0 ? (
                <HealthTable records={filteredRecords} onEdit={handleEdit} onDelete={handleDelete} />
            ) : (
                <div className="text-center py-16 bg-bms-secondary/30 rounded-lg">
                    <h3 className="text-xl font-semibold text-bms-text">No Health Records Found</h3>
                    <p className="text-bms-accent mt-2">No records match your search criteria.</p>
                </div>
            )}

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title={currentRecord ? 'Edit Health Record' : 'Add New Health Record'}
            >
                <HealthForm
                    record={currentRecord}
                    onSave={handleSave}
                    onClose={() => setIsModalOpen(false)}
                    isSaving={isSaving}
                />
            </Modal>
        </div>
    );
};

export default HealthModule;