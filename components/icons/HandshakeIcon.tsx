import React from 'react';
import { IconProps } from './Icon';

const HandshakeIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14.5 18L12 15.5 9.5 18"></path>
        <path d="M7 10h1.5a2.5 2.5 0 012.5 2.5V18"></path>
        <path d="M17 10h-1.5a2.5 2.5 0 00-2.5 2.5V18"></path>
        <path d="M3 14v-2.5A4.5 4.5 0 017.5 7h9A4.5 4.5 0 0121 11.5V14"></path>
    </svg>
);

export default HandshakeIcon;