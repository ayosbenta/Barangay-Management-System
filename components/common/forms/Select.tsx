import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: string;
    children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, id, error, children, ...props }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-bms-accent mb-1">{label}</label>
            <select
                id={id}
                className={`w-full bg-bms-primary border border-bms-tertiary rounded-md p-2 text-bms-text focus:outline-none focus:ring-2 transition-all duration-200 ${error ? 'border-red-500 focus:ring-red-500/50' : 'focus:ring-bms-cyan/50'}`}
                {...props}
            >
                {children}
            </select>
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default Select;
