
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, id, error, ...props }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-bms-accent mb-1">{label}</label>
            <input 
                id={id}
                className={`w-full bg-bms-primary border border-bms-tertiary rounded-md p-2 text-bms-text focus:outline-none focus:ring-2 transition-all duration-200 ${error ? 'border-red-500 focus:ring-red-500/50' : 'focus:ring-bms-cyan/50'}`}
                {...props} 
            />
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default Input;
