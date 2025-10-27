
import React from 'react';
import { IconProps } from './Icon';

const BlotterIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
        <path d="m14 2 1 6h6"></path>
        <path d="M8 12h8"></path><path d="M8 16h4"></path>
    </svg>
);

export default BlotterIcon;
