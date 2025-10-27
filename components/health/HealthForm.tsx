import React, { useState, useEffect } from 'react';
import { HealthRecord } from '../../types';
import Input from '../common/forms/Input';
import Textarea from '../common/forms/Textarea';
import Button from '../common/forms/Button';

interface HealthFormProps {
    record?: HealthRecord | null;
    onSave: (record: Omit<HealthRecord, 'id'> | HealthRecord) => Promise<void>;
    onClose: () => void;
    isSaving: boolean;
}

const HealthForm: React.FC<HealthFormProps> = ({ record, onSave, onClose, isSaving }) => {
    const [formData, setFormData] = useState({
        residentId: '',
        residentName: '',
        checkupDate: '',
        diagnosis: '',
        treatment: '',
        notes: '',
    });
    const [errors, setErrors] = useState<Partial<typeof formData>>({});

    useEffect(() => {
        if (record) {
            setFormData({
                ...record,
                checkupDate: new Date(record.checkupDate).toISOString().slice(0, 16),
                notes: record.notes || '',
            });
        }
    }, [record]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = (): boolean => {
        const newErrors: Partial<typeof formData> = {};
        if (!formData.residentName.trim()) newErrors.residentName = 'Patient name is required.';
        if (!formData.checkupDate) newErrors.checkupDate = 'Checkup date is required.';
        if (!formData.diagnosis.trim()) newErrors.diagnosis = 'Diagnosis is required.';
        if (!formData.treatment.trim()) newErrors.treatment = 'Treatment is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const dataToSave = {
                ...formData,
                checkupDate: new Date(formData.checkupDate).toISOString(),
            };
            if (record) {
                await onSave({ ...dataToSave, id: record.id });
            } else {
                await onSave(dataToSave);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Patient Name" name="residentName" value={formData.residentName} onChange={handleChange} error={errors.residentName} required />
                    <Input label="Checkup Date" name="checkupDate" type="datetime-local" value={formData.checkupDate} onChange={handleChange} error={errors.checkupDate} required />
                </div>
                <Input label="Diagnosis" name="diagnosis" value={formData.diagnosis} onChange={handleChange} error={errors.diagnosis} required />
                <Textarea label="Treatment / Prescription" name="treatment" value={formData.treatment} onChange={handleChange} error={errors.treatment} rows={3} required />
                <Textarea label="Additional Notes" name="notes" value={formData.notes} onChange={handleChange} rows={2} />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
                <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="primary" isLoading={isSaving}>{record ? 'Save Changes' : 'Add Record'}</Button>
            </div>
        </form>
    );
};

export default HealthForm;
