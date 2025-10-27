import React from 'react';
import { IconProps } from './Icon';

const SyringeIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m18 2 4 4"></path>
        <path d="m17 7 3-3"></path>
        <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-2.6-2.6c-1-1-1-2.5 0-3.4L15 2"></path>
        <path d="m9 12 4 4"></path>
        <path d="m5 16 4 4"></path>
    </svg>
);

export default SyringeIcon;
