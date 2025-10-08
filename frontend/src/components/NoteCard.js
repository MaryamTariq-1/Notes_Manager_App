import React from 'react';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="note-card">
      {note.image && (
        <div style={{ marginBottom: '15px' }}>
          <img
            src={`http://localhost:5000/uploads/${note.image}`}
            alt={note.title}
            style={{
              width: '100%',
              maxHeight: '150px',
              objectFit: 'cover',
              borderRadius: '8px',
              border: '1px solid #eee'
            }}
          />
        </div>
      )}

      <div className="note-title">{note.title}</div>
      <div className="note-content">
        {note.content.length > 150
          ? `${note.content.substring(0, 150)}...`
          : note.content
        }
      </div>

      {note.tags && note.tags.length > 0 && (
        <div className="note-tags">
          {note.tags.map((tag, index) => (
            <span key={index} className="tag">#{tag}</span>
          ))}
        </div>
      )}

      <div style={{
        fontSize: '12px',
        color: '#666',
        marginTop: '10px',
        borderTop: '1px solid #eee',
        paddingTop: '10px'
      }}>
        Created: {formatDate(note.createdAt)}
        {note.updatedAt !== note.createdAt && (
          <div>Updated: {formatDate(note.updatedAt)}</div>
        )}
      </div>

      <div className="note-actions">
        <button
          onClick={() => onEdit(note)}
          className="btn btn-secondary"
          style={{ fontSize: '14px', padding: '5px 10px' }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="btn btn-danger"
          style={{ fontSize: '14px', padding: '5px 10px' }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;