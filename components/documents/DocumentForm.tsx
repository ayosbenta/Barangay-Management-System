import React, { useState, useEffect } from 'react';
import { Document, DocumentType } from '../../types';
import Input from '../common/forms/Input';
import Select from '../common/forms/Select';
import Textarea from '../common/forms/Textarea';
import Button from '../common/forms/Button';

interface DocumentFormProps {
    document?: Document | null;
    onSave: (doc: Omit<Document, 'id' | 'dateIssued'> | Document) => Promise<void>;
    onClose: () => void;
    isSaving: boolean;
}

const DocumentForm: React.FC<DocumentFormProps> = ({ document, onSave, onClose, isSaving }) => {
    const [formData, setFormData] = useState({
        residentId: '',
        residentName: '',
        documentType: DocumentType.BARANGAY_CLEARANCE,
        purpose: '',
        status: 'Pending' as 'Pending' | 'Approved' | 'Rejected',
    });
    const [errors, setErrors] = useState<Partial<typeof formData>>({});

    useEffect(() => {
        if (document) {
            setFormData(document);
        }
    }, [document]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = (): boolean => {
        const newErrors: Partial<typeof formData> = {};
        if (!formData.residentName.trim()) newErrors.residentName = 'Recipient name is required.';
        if (!formData.purpose.trim()) newErrors.purpose = 'Purpose is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            if (document) {
                await onSave({ ...formData, id: document.id, dateIssued: document.dateIssued });
            } else {
                await onSave(formData);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                    label="Recipient Full Name" 
                    name="residentName" 
                    value={formData.residentName} 
                    onChange={handleChange} 
                    error={errors.residentName} 
                    required 
                />
                <Select
                    label="Document Type"
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleChange}
                    required
                >
                    {Object.values(DocumentType).map(dt => <option key={dt} value={dt}>{dt}</option>)}
                </Select>
                <div className="md:col-span-2">
                    <Textarea
                        label="Purpose"
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        error={errors.purpose}
                        rows={3}
                        required
                    />
                </div>
                <Select
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </Select>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
                <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="primary" isLoading={isSaving}>
                    {document ? 'Save Changes' : 'Issue Document'}
                </Button>
            </div>
        </form>
    );
};

export default DocumentForm;
