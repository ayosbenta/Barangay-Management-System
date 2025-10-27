
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { getDailyBriefing } from '../services/geminiService';
import PopulationChart from './charts/PopulationChart';
import FinanceChart from './charts/FinanceChart';
import ReactMarkdown from 'react-markdown';

interface DashboardProps {
  user: User;
}

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode, color: 'cyan' | 'magenta' }> = ({ title, value, icon, color }) => {
    const colorClasses = color === 'cyan' ? 'border-bms-cyan text-bms-cyan shadow-glow-cyan' : 'border-bms-magenta text-bms-magenta shadow-glow-magenta';

    return (
        <div className={`bg-bms-secondary/50 backdrop-blur-sm p-4 rounded-lg border border-bms-tertiary/50 flex items-center justify-between hover:border-bms-cyan transition-all duration-300`}>
            <div>
                <p className="text-sm text-bms-accent font-mono">{title}</p>
                <p className="text-3xl font-bold text-bms-text">{value}</p>
            </div>
            <div className={`p-3 rounded-full bg-bms-primary border-2 ${colorClasses}`}>
                {icon}
            </div>
        </div>
    );
}

const UserIcon: React.FC<{className?:string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const AlertTriangleIcon: React.FC<{className?:string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);
const FileTextIcon: React.FC<{className?:string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);


const Dashboard: React.FC<DashboardProps> = ({ user }) => {
    const [briefing, setBriefing] = useState<string>('Connecting to AI Core...');
    const [isLoadingBriefing, setIsLoadingBriefing] = useState(true);

    useEffect(() => {
        const fetchBriefing = async () => {
            setIsLoadingBriefing(true);
            const briefingText = await getDailyBriefing(user.name);
            setBriefing(briefingText);
            setIsLoadingBriefing(false);
        };

        fetchBriefing();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Header section */}
            <div className="lg:col-span-3">
                <h2 className="text-3xl font-bold">Welcome, {user.name}</h2>
                <p className="text-bms-accent">Here is your command center overview for today.</p>
            </div>

            {/* Stat Cards */}
            <StatCard title="Total Residents" value="8,721" icon={<UserIcon />} color="cyan"/>
            <StatCard title="Incidents Today" value="3" icon={<AlertTriangleIcon />} color="magenta" />
            <StatCard title="Permits Issued" value="42" icon={<FileTextIcon />} color="cyan"/>

            {/* Daily Briefing */}
            <div className="lg:col-span-1 bg-bms-secondary/50 backdrop-blur-sm p-6 rounded-lg border border-bms-tertiary/50 min-h-[200px]">
                <h3 className="font-bold text-lg font-mono text-bms-cyan">[ Daily Briefing ]</h3>
                {isLoadingBriefing ? (
                    <div className="flex items-center justify-center h-full">
                         <div className="w-8 h-8 border-4 border-bms-cyan/50 border-t-bms-cyan rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="prose prose-sm prose-invert text-bms-text mt-4">
                        <ReactMarkdown>{briefing}</ReactMarkdown>
                    </div>
                )}
            </div>
            
            {/* Population Chart */}
            <div className="lg:col-span-2 bg-bms-secondary/50 backdrop-blur-sm p-6 rounded-lg border border-bms-tertiary/50">
                <h3 className="font-bold text-lg font-mono text-bms-cyan">[ Population Demographics ]</h3>
                <div className="w-full h-64 mt-4">
                    <PopulationChart />
                </div>
            </div>

            {/* Finance Chart */}
            <div className="lg:col-span-3 bg-bms-secondary/50 backdrop-blur-sm p-6 rounded-lg border border-bms-tertiary/50">
                 <h3 className="font-bold text-lg font-mono text-bms-magenta">[ Financial Overview: Last 6 Cycles ]</h3>
                <div className="w-full h-72 mt-4">
                    <FinanceChart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
