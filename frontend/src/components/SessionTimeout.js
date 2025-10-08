import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const SessionTimeout = () => {
  const { sessionExpired, dismissSessionExpired } = useAuth();

  if (!sessionExpired) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '10px',
        textAlign: 'center',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>"OOPS!"</div>
        <h2 style={{ marginBottom: '15px', color: '#333' }}>Session Expired</h2>
        <p style={{ marginBottom: '25px', color: '#666', lineHeight: '1.5' }}>
          Your session has expired due to inactivity. Please log in again to continue using the application.
        </p>
        <button
          onClick={dismissSessionExpired}
          style={{
            padding: '12px 30px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          signin Again
        </button>
      </div>
    </div>
  );
};

export default SessionTimeout;