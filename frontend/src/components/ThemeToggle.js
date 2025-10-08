import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      style={{
        background: 'none',
        border: '1px solid var(--border-color)',
        borderRadius: '20px',
        padding: '8px 12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: 'var(--text-primary)',
        fontSize: '14px',
        transition: 'all 0.3s ease'
      }}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span style={{ fontSize: '18px' }}>
        {isDarkMode ? '🌙' : '☀️'}
      </span>
      <span>
        {isDarkMode ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};

export default ThemeToggle;