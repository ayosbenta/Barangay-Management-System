
import React from 'react';
import { Module } from '../types';
import DashboardIcon from './icons/DashboardIcon';
import ResidentsIcon from './icons/ResidentsIcon';
import DocumentIcon from './icons/DocumentIcon';
import BlotterIcon from './icons/BlotterIcon';
import HealthIcon from './icons/HealthIcon';
import FinanceIcon from './icons/FinanceIcon';

interface SidebarProps {
  activeModule: Module;
  onModuleSelect: (module: Module) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const moduleList = [
  { id: Module.DASHBOARD, icon: DashboardIcon },
  { id: Module.RESIDENTS, icon: ResidentsIcon },
  { id: Module.DOCUMENTS, icon: DocumentIcon },
  { id: Module.BLOTTER, icon: BlotterIcon },
  { id: Module.HEALTH, icon: HealthIcon },
  { id: Module.FINANCE, icon: FinanceIcon },
  // Add other modules here...
];


const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleSelect, isOpen, setIsOpen }) => {
  const NavItem = ({ module, Icon, isActive }: { module: Module, Icon: React.FC<{className?: string}>, isActive: boolean }) => (
    <li>
      <button
        onClick={() => onModuleSelect(module)}
        className={`w-full flex items-center p-3 my-1 rounded-lg transition-all duration-200 ease-in-out group ${
          isActive
            ? 'bg-bms-cyan/20 text-bms-cyan shadow-glow-cyan'
            : 'text-bms-accent hover:bg-bms-tertiary/50 hover:text-bms-text'
        }`}
        title={module}
      >
        <Icon className="h-6 w-6" />
        <span className={`ml-4 text-sm font-semibold whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'}`}>{module}</span>
      </button>
    </li>
  );

  return (
    <>
    <div className={`fixed inset-0 bg-bms-primary/50 z-30 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}></div>
    <aside className={`absolute md:relative z-40 bg-bms-secondary h-full flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>
        <div className={`flex items-center justify-center h-20 border-b border-bms-tertiary/50 transition-all duration-300 ${isOpen ? 'px-6' : 'px-0'}`}>
            <svg className="h-8 w-8 text-bms-cyan" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"/></svg>
            <h1 className={`font-bold text-lg ml-3 text-bms-text whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'}`}>
                BMS Command
            </h1>
        </div>
        <nav className="flex-1 p-3">
            <ul>
                {moduleList.map(({ id, icon }) => (
                    <NavItem key={id} module={id} Icon={icon} isActive={activeModule === id} />
                ))}
            </ul>
        </nav>
        <div className={`border-t border-t-bms-tertiary/50 p-4 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-bms-primary/50 rounded-lg p-3 text-center">
            <p className="text-xs text-bms-accent">BSS Starlight Haven</p>
            <p className="text-xs font-mono text-bms-cyan">v1.0.0-alpha</p>
          </div>
        </div>
    </aside>
    </>
  );
};

export default Sidebar;
