
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-bms-primary/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-bms-secondary rounded-lg shadow-lg w-full max-w-2xl border border-bms-tertiary/50 m-4"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-bms-tertiary/50">
                    <h2 className="text-xl font-bold text-bms-cyan font-mono">{title}</h2>
                    <button onClick={onClose} className="text-bms-accent hover:text-bms-text transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
