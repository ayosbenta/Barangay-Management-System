import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType } from '../../types';
import Input from '../common/forms/Input';
import Select from '../common/forms/Select';
import Textarea from '../common/forms/Textarea';
import Button from '../common/forms/Button';

interface FinanceFormProps {
    transaction?: Transaction | null;
    onSave: (txn: Omit<Transaction, 'id'> | Transaction) => Promise<void>;
    onClose: () => void;
    isSaving: boolean;
}

const FinanceForm: React.FC<FinanceFormProps> = ({ transaction, onSave, onClose, isSaving }) => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        description: '',
        type: TransactionType.INCOME,
        amount: 0,
        category: '',
    });
    // FIX: Changed the type of the errors state to allow string error messages for all fields, including 'amount'.
    const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

    useEffect(() => {
        if (transaction) {
            setFormData({
                ...transaction,
                date: new Date(transaction.date).toISOString().split('T')[0],
            });
        }
    }, [transaction]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'number' ? parseFloat(value) : value 
        }));
    };

    const validate = (): boolean => {
        // FIX: Ensured newErrors object type matches the updated errors state type.
        const newErrors: Partial<Record<keyof typeof formData, string>> = {};
        if (!formData.description.trim()) newErrors.description = 'Description is required.';
        if (!formData.category.trim()) newErrors.category = 'Category is required.';
        if (formData.amount <= 0) newErrors.amount = 'Amount must be greater than zero.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const dataToSave = {
                ...formData,
                date: new Date(formData.date).toISOString(),
            };
            if (transaction) {
                await onSave({ ...dataToSave, id: transaction.id });
            } else {
                await onSave(dataToSave);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <Input label="Date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} error={errors.description} rows={2} required />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select label="Type" name="type" value={formData.type} onChange={handleChange}>
                        {Object.values(TransactionType).map(t => <option key={t} value={t}>{t}</option>)}
                    </Select>
                    <Input label="Category" name="category" value={formData.category} onChange={handleChange} error={errors.category} required />
                </div>
                {/* FIX: Removed `.toString()` as `errors.amount` is now correctly typed as a string. */}
                <Input label="Amount" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} error={errors.amount} required />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
                <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="primary" isLoading={isSaving}>{transaction ? 'Save Changes' : 'Add Transaction'}</Button>
            </div>
        </form>
    );
};

export default FinanceForm;
