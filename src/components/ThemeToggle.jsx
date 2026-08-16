import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';

export function ThemeToggle({ themeMode, resolvedTheme, toggleTheme, setTheme }) {
  const getIcon = () => {
    if (themeMode === 'system') {
      return <Laptop className="icon-theme" size={18} />;
    }
    return resolvedTheme === 'dark' ? (
      <Moon className="icon-theme moon-glow" size={18} />
    ) : (
      <Sun className="icon-theme sun-glow" size={18} />
    );
  };

  const getLabel = () => {
    if (themeMode === 'system') return 'System';
    return resolvedTheme === 'dark' ? 'Dark' : 'Light';
  };

  return (
    <div className="theme-toggle-container">
      <div className="theme-pill-group" role="radiogroup" aria-label="Theme mode selection">
        <button
          type="button"
          className={`theme-pill ${themeMode === 'light' ? 'active' : ''}`}
          onClick={() => setTheme('light')}
          title="Light Theme"
          aria-label="Light mode"
        >
          <Sun size={15} />
          <span>Light</span>
        </button>

        <button
          type="button"
          className={`theme-pill ${themeMode === 'dark' ? 'active' : ''}`}
          onClick={() => setTheme('dark')}
          title="Dark Theme"
          aria-label="Dark mode"
        >
          <Moon size={15} />
          <span>Dark</span>
        </button>

        <button
          type="button"
          className={`theme-pill ${themeMode === 'system' ? 'active' : ''}`}
          onClick={() => setTheme('system')}
          title="Match System Settings"
          aria-label="System mode"
        >
          <Laptop size={15} />
          <span>Auto</span>
        </button>
      </div>
    </div>
  );
}
