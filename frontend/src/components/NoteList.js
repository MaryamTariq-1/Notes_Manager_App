import React from 'react';
import NoteCard from './NoteCard';

const NoteList = ({ notes, onEdit, onDelete, searchTerm }) => {
  if (notes.length === 0) {
    return (
      <div className="text-center" style={{ padding: '40px 0' }}>
        <h3>No notes found</h3>
        <p>
          {searchTerm
            ? `No notes match your search for "${searchTerm}"`
            : 'Create your first note to get started!'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="notes-grid">
      {notes.map(note => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default NoteList;