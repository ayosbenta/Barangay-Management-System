
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Cycle 1', revenue: 4000, expenses: 2400 },
  { name: 'Cycle 2', revenue: 3000, expenses: 1398 },
  { name: 'Cycle 3', revenue: 2000, expenses: 9800 },
  { name: 'Cycle 4', revenue: 2780, expenses: 3908 },
  { name: 'Cycle 5', revenue: 1890, expenses: 4800 },
  { name: 'Cycle 6', revenue: 2390, expenses: 3800 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bms-primary/80 backdrop-blur-sm p-3 border border-bms-tertiary rounded-lg">
        <p className="label font-bold text-bms-text">{label}</p>
        <p className="intro text-bms-cyan">{`Revenue: ${payload[0].value.toLocaleString()}`}</p>
        <p className="intro text-bms-magenta">{`Expenses: ${payload[1].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const FinanceChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00F5D4" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#00F5D4" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FF00F5" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#FF00F5" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#415A77" strokeOpacity={0.3}/>
        <XAxis dataKey="name" tick={{ fill: '#E0E1DD', fontSize: 12 }} stroke="#778DA9" />
        <YAxis tick={{ fill: '#E0E1DD', fontSize: 12 }} stroke="#778DA9" />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{fontSize: "14px", color: '#E0E1DD'}}/>
        <Area type="monotone" dataKey="revenue" stroke="#00F5D4" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
        <Area type="monotone" dataKey="expenses" stroke="#FF00F5" fillOpacity={1} fill="url(#colorExpenses)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default FinanceChart;
