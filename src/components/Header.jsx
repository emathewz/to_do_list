import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header({ themeMode, resolvedTheme, toggleTheme, setTheme, stats }) {
  return (
    <header className="app-header glass-card">
      <div className="header-top">
        <div className="brand-group">
          <div className="brand-icon-wrapper">
            <CheckCircle2 className="brand-icon" size={28} />
          </div>
          <div>
            <div className="brand-title-row">
              <h1 className="brand-title">TaskFlow</h1>
              <span className="brand-badge">SDD Spec-Kit</span>
            </div>
            <p className="brand-subtitle">
              Spec-Driven React Application • LocalStorage Sync
            </p>
          </div>
        </div>

        <ThemeToggle
          themeMode={themeMode}
          resolvedTheme={resolvedTheme}
          toggleTheme={toggleTheme}
          setTheme={setTheme}
        />
      </div>
    </header>
  );
}
