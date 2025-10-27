
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    isLoading?: boolean;
    children: React.ReactNode;
    icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', isLoading = false, icon, ...props }) => {
    const baseClasses = 'px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
        primary: 'bg-bms-cyan text-bms-primary hover:bg-opacity-80 shadow-glow-cyan',
        secondary: 'bg-bms-tertiary text-bms-text hover:bg-bms-accent',
        danger: 'bg-red-600 text-white hover:bg-red-700',
    };

    return (
        <button className={`${baseClasses} ${variantClasses[variant]}`} disabled={isLoading} {...props}>
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <>
                    {icon && <span className="mr-2">{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
};

export default Button;
