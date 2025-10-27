
import React from 'react';
import { User, Module } from '../types';

interface HeaderProps {
  user: User;
  activeModule: Module;
  onToggleSidebar: () => void;
}

const MenuIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const SearchIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);


const Header: React.FC<HeaderProps> = ({ user, activeModule, onToggleSidebar }) => {
  return (
    <header className="flex-shrink-0 h-20 bg-bms-secondary/50 backdrop-blur-sm border-b border-bms-tertiary/50 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <button onClick={onToggleSidebar} className="md:hidden text-bms-accent hover:text-bms-text mr-4">
            <MenuIcon className="w-6 h-6"/>
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-bms-text tracking-wider">{activeModule}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex relative items-center">
            <SearchIcon className="absolute left-3 h-5 w-5 text-bms-accent" />
            <input 
                type="text" 
                placeholder="Search..."
                className="bg-bms-primary border border-bms-tertiary rounded-full py-2 pl-10 pr-4 w-64 text-sm text-bms-text focus:outline-none focus:ring-2 focus:ring-bms-cyan/50"
            />
        </div>
        <div className="flex items-center">
          <img src={user.avatarUrl} alt={user.name} className="h-10 w-10 rounded-full border-2 border-bms-cyan" />
          <div className="hidden lg:block ml-3">
            <p className="font-semibold text-sm text-bms-text">{user.name}</p>
            <p className="text-xs text-bms-accent">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
