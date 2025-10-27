
import React, { useState, useEffect } from 'react';
import { Resident, Gender, CivilStatus } from '../../types';
import Input from '../common/forms/Input';
import Button from '../common/forms/Button';

interface ResidentFormProps {
    resident?: Resident | null;
    onSave: (resident: Omit<Resident, 'id' | 'dateRegistered'> | Resident) => Promise<void>;
    onClose: () => void;
    isSaving: boolean;
}

const ResidentForm: React.FC<ResidentFormProps> = ({ resident, onSave, onClose, isSaving }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        suffix: '',
        birthDate: '',
        gender: Gender.MALE,
        civilStatus: CivilStatus.SINGLE,
        address: '',
        contactNumber: '',
        email: '',
        householdId: '',
        isVoter: false,
    });
    const [errors, setErrors] = useState<Partial<typeof formData>>({});

    useEffect(() => {
        if (resident) {
            setFormData({
                ...resident,
                middleName: resident.middleName || '',
                suffix: resident.suffix || '',
                email: resident.email || '',
            });
        }
    }, [resident]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: isCheckbox ? checked : value,
        }));
    };

    const validate = (): boolean => {
        const newErrors: Partial<typeof formData> = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
        if (!formData.birthDate) newErrors.birthDate = 'Birth date is required.';
        if (!formData.address.trim()) newErrors.address = 'Address is required.';
        if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required.';
        else if (!/^(09|\+639)\d{9}$/.test(formData.contactNumber)) newErrors.contactNumber = 'Invalid Philippine mobile number.';
        if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            if (resident) {
                await onSave({ ...formData, id: resident.id, dateRegistered: resident.dateRegistered });
            } else {
                await onSave(formData);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} required />
                <Input label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} />
                <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} required />
                <Input label="Suffix (e.g., Jr., III)" name="suffix" value={formData.suffix} onChange={handleChange} />
                <Input label="Birth Date" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} error={errors.birthDate} required />
                <div>
                    <label className="block text-sm font-medium text-bms-accent mb-1">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-bms-primary border border-bms-tertiary rounded-md p-2 text-bms-text focus:outline-none focus:ring-2 focus:ring-bms-cyan/50">
                        {Object.values(Gender).map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-bms-accent mb-1">Civil Status</label>
                    <select name="civilStatus" value={formData.civilStatus} onChange={handleChange} className="w-full bg-bms-primary border border-bms-tertiary rounded-md p-2 text-bms-text focus:outline-none focus:ring-2 focus:ring-bms-cyan/50">
                        {Object.values(CivilStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <Input label="Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} required />
                <Input label="Contact Number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} error={errors.contactNumber} required />
                <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
                <Input label="Household ID" name="householdId" value={formData.householdId} onChange={handleChange} />
                 <div className="flex items-center space-x-3 md:col-span-2">
                    <input type="checkbox" id="isVoter" name="isVoter" checked={formData.isVoter} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-bms-cyan focus:ring-bms-cyan"/>
                    <label htmlFor="isVoter" className="text-sm text-bms-accent">Registered Voter</label>
                </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
                <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="primary" isLoading={isSaving}>{resident ? 'Save Changes' : 'Add Resident'}</Button>
            </div>
        </form>
    );
};

export default ResidentForm;
