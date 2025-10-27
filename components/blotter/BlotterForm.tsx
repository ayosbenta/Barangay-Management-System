import React, { useState, useEffect } from 'react';
import { LuponCase, CaseStatus } from '../../types';
import Input from '../common/forms/Input';
import Select from '../common/forms/Select';
import Textarea from '../common/forms/Textarea';
import Button from '../common/forms/Button';

interface BlotterFormProps {
    caseRecord?: LuponCase | null;
    onSave: (record: Omit<LuponCase, 'id'> | LuponCase) => Promise<void>;
    onClose: () => void;
    isSaving: boolean;
}

const BlotterForm: React.FC<BlotterFormProps> = ({ caseRecord, onSave, onClose, isSaving }) => {
    const [formData, setFormData] = useState({
        caseNumber: '',
        complainant: '',
        respondent: '',
        natureOfComplaint: '',
        dateFiled: '',
        narrative: '',
        status: CaseStatus.FILED,
        actionTaken: '',
        settlementDetails: ''
    });
    const [errors, setErrors] = useState<Partial<typeof formData>>({});

    useEffect(() => {
        if (caseRecord) {
            setFormData({
                ...caseRecord,
                dateFiled: new Date(caseRecord.dateFiled).toISOString().split('T')[0], // Format for date input
                actionTaken: caseRecord.actionTaken || '',
                settlementDetails: caseRecord.settlementDetails || ''
            });
        } else {
            // Suggest a new case number
            const year = new Date().getFullYear();
            const nextCaseNum = new Date().getTime().toString().slice(-4); // simplified logic
            setFormData(prev => ({ ...prev, caseNumber: `BMS-${year}-${nextCaseNum}`}));
        }
    }, [caseRecord]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = (): boolean => {
        const newErrors: Partial<typeof formData> = {};
        if (!formData.caseNumber.trim()) newErrors.caseNumber = 'Case number is required.';
        if (!formData.complainant.trim()) newErrors.complainant = 'Complainant name is required.';
        if (!formData.respondent.trim()) newErrors.respondent = 'Respondent name is required.';
        if (!formData.natureOfComplaint.trim()) newErrors.natureOfComplaint = 'Nature of complaint is required.';
        if (!formData.dateFiled) newErrors.dateFiled = 'Date of filing is required.';
        if (!formData.narrative.trim()) newErrors.narrative = 'Narrative is required.';
        if (formData.status === CaseStatus.SETTLED && !formData.settlementDetails?.trim()) {
            newErrors.settlementDetails = 'Settlement details are required for settled cases.'
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const dataToSave = {
                ...formData,
                dateFiled: new Date(formData.dateFiled).toISOString(),
            };
            if (caseRecord) {
                await onSave({ ...dataToSave, id: caseRecord.id });
            } else {
                await onSave(dataToSave);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Case Number" name="caseNumber" value={formData.caseNumber} onChange={handleChange} error={errors.caseNumber} required />
                    <Input label="Date Filed" name="dateFiled" type="date" value={formData.dateFiled} onChange={handleChange} error={errors.dateFiled} required />
                    <Input label="Complainant" name="complainant" value={formData.complainant} onChange={handleChange} error={errors.complainant} required />
                    <Input label="Respondent" name="respondent" value={formData.respondent} onChange={handleChange} error={errors.respondent} required />
                </div>
                <Input label="Nature of Complaint" name="natureOfComplaint" value={formData.natureOfComplaint} onChange={handleChange} error={errors.natureOfComplaint} required />
                <Textarea label="Complaint Narrative" name="narrative" value={formData.narrative} onChange={handleChange} error={errors.narrative} rows={4} required />
                <Textarea label="Action Taken" name="actionTaken" value={formData.actionTaken} onChange={handleChange} rows={3} placeholder="e.g., Summons issued, Mediation hearing scheduled for..."/>

                <Select label="Status" name="status" value={formData.status} onChange={handleChange}>
                    {Object.values(CaseStatus).map(s => <option key={s} value={s}>{s}</option>)}
                </Select>

                {formData.status === CaseStatus.SETTLED && (
                    <Textarea label="Settlement Details" name="settlementDetails" value={formData.settlementDetails} onChange={handleChange} error={errors.settlementDetails} rows={3} placeholder="Describe the terms of the amicable settlement." required />
                )}
            </div>
            <div className="flex justify-end space-x-4 mt-6">
                <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="primary" isLoading={isSaving}>{caseRecord ? 'Save Changes' : 'File Complaint'}</Button>
            </div>
        </form>
    );
};

export default BlotterForm;