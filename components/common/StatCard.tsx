import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color?: 'cyan' | 'magenta' | 'text';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color = 'cyan' }) => {
    const colorClasses = {
        cyan: 'text-bms-cyan',
        magenta: 'text-bms-magenta',
        text: 'text-bms-text',
    };

    return (
        <div className="bg-bms-secondary/50 p-4 rounded-lg border border-bms-tertiary/50 flex items-center justify-between">
            <div>
                <p className="text-sm text-bms-accent font-mono uppercase">{title}</p>
                <p className="text-3xl font-bold text-bms-text">{value}</p>
            </div>
            <div className={colorClasses[color]}>
                {icon}
            </div>
        </div>
    );
};

export default StatCard;
