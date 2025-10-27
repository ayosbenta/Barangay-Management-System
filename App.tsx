import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ResidentsModule from './components/residents/ResidentsModule';
import DocumentsModule from './components/documents/DocumentsModule';
import BlotterModule from './components/blotter/BlotterModule';
import HealthModule from './components/health/HealthModule';
import FinanceModule from './components/finance/FinanceModule';
import ModulePlaceholder from './components/ModulePlaceholder';
import { Module, User } from './types';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState<Module>(Module.DASHBOARD);

  // Mock user data
  const user: User = {
    id: 'user-001',
    name: 'Hon. Nelson Abellana',
    role: 'Barangay Captain',
    avatarUrl: 'https://i.pravatar.cc/150?u=nelsonabellana',
  };

  const renderModule = () => {
    switch (activeModule) {
      case Module.DASHBOARD:
        return <Dashboard user={user} />;
      case Module.RESIDENTS:
        return <ResidentsModule />;
      case Module.DOCUMENTS:
        return <DocumentsModule />;
      case Module.BLOTTER:
        return <BlotterModule />;
      case Module.HEALTH:
        return <HealthModule />;
      case Module.FINANCE:
        return <FinanceModule />;
      default:
        return <ModulePlaceholder module={activeModule} />;
    }
  };

  return (
    <div className="flex h-screen bg-bms-primary text-bms-text font-sans">
      <Sidebar 
        activeModule={activeModule} 
        onModuleSelect={setActiveModule}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={user} 
          activeModule={activeModule}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-bms-primary p-4 md:p-6">
          {renderModule()}
        </main>
      </div>
    </div>
  );
};

export default App;