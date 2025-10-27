
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: '0-10', value: 1200 },
  { name: '11-20', value: 1500 },
  { name: '21-30', value: 2100 },
  { name: '31-40', value: 1800 },
  { name: '41-50', value: 1300 },
  { name: '51-60', value: 900 },
  { name: '60+', value: 921 },
];

const colors = ['#00F5D4', '#00EAD3', '#00DED1', '#00D2CF', '#00C6CD', '#00BACC', '#00AECB'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bms-primary/80 backdrop-blur-sm p-3 border border-bms-tertiary rounded-lg">
        <p className="label font-bold text-bms-cyan">{`Age Group: ${label}`}</p>
        <p className="intro text-bms-text">{`Population: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const PopulationChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#415A77" strokeOpacity={0.3} />
        <XAxis dataKey="name" tick={{ fill: '#E0E1DD', fontSize: 12 }} stroke="#778DA9"/>
        <YAxis tick={{ fill: '#E0E1DD', fontSize: 12 }} stroke="#778DA9"/>
        <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(119, 141, 169, 0.2)'}}/>
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PopulationChart;
