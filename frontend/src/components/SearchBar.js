import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search notes by title, content, or tags..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={handleClear}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ×
            </button>
          )}
        </div>
        {searchTerm && (
          <button
            onClick={handleClear}
            className="btn btn-secondary"
          >
            Clear
          </button>
        )}
      </div>
      {searchTerm && (
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          Searching for: <strong>"{searchTerm}"</strong>
        </div>
      )}
    </div>
  );
};

export default SearchBar;