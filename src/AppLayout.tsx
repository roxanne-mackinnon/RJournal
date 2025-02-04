import React from 'react';
import './css/AppLayout.css';

interface AppLayoutProps {
    logo: React.JSX.Element;
    navbar: React.JSX.Element;
    sidebar: React.JSX.Element;
    main: React.JSX.Element;
}
export default function AppLayout({logo, navbar, sidebar, main}: AppLayoutProps) {
    return (
        <div className="app-layout">
            {logo}{navbar}{sidebar}{main}
        </div>
    )
}