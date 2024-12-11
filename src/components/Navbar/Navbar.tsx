import React, { ReactNode } from 'react'
import cl from './Navbar.module.css'
import { NavLink } from 'react-router';

interface IProps {
    children: ReactNode;
  }

export const Navbar = ({ children }: IProps) => {
    return (
        <div>
            <header>
                <div className={cl.headerContent}>
                    <NavLink to="/settings/epicentr"><nav>Epicentr settings</nav></NavLink>
                    <NavLink to="/settings/rozetka"><nav>Rozetka settings</nav></NavLink>
                    <NavLink to="/settings/hotline"><nav>Hotline settings</nav></NavLink>
                    <NavLink to="/word-parser"><nav>Word parser</nav></NavLink>
                </div>
            </header>
            <main>
                <div className={cl.content}>
                    {children}
                </div>
            </main>
        </div>
    );
};