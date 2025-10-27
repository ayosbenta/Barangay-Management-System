
import React from 'react';
import { Module } from '../types';

interface ModulePlaceholderProps {
  module: Module;
}

const ModulePlaceholder: React.FC<ModulePlaceholderProps> = ({ module }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center bg-bms-secondary/30 rounded-lg border-2 border-dashed border-bms-tertiary p-8">
      <div className="w-16 h-16 bg-bms-tertiary rounded-full flex items-center justify-center mb-4 animate-pulse-slow">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-bms-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-bms-text">Module: <span className="text-bms-cyan">{module}</span></h2>
      <p className="mt-2 text-bms-accent">This command module is currently under construction.</p>
      <p className="text-sm text-bms-tertiary">Our engineers are working hard to bring it online soon.</p>
    </div>
  );
};

export default ModulePlaceholder;
