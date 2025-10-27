import React from 'react';
import { IconProps } from './Icon';

const GavelIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14 12l-4 4"></path><path d="M15.5 5.5l-5 5"></path><path d="M2 16l6 6"></path><path d="M22 8l-6-6"></path><path d="M8 2l4 4"></path><path d="M16 22l-4-4"></path>
    </svg>
);

export default GavelIcon;