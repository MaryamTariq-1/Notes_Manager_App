import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import axios from 'axios';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch notes from API
  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notes');
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Create new note with image support
  const createNote = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/notes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setNotes([response.data, ...notes]);
      setShowNoteForm(false);
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Error creating note: ' + (error.response?.data?.message || error.message));
    }
  };

  // Update existing note with image support
  const updateNote = async (formData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/notes/${editingNote._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setNotes(notes.map(note => note._id === editingNote._id ? response.data : note));
      setEditingNote(null);
      setShowNoteForm(false);
    } catch (error) {
      console.error('Error updating note:', error);
      alert('Error updating note: ' + (error.response?.data?.message || error.message));
    }
  };

  // Delete note
  const deleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await axios.delete(`http://localhost:5000/api/notes/${noteId}`);
        setNotes(notes.filter(note => note._id !== noteId));
      } catch (error) {
        console.error('Error deleting note:', error);
        alert('Error deleting note: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  // Handle form submission - now accepts FormData for image uploads
  const handleNoteSubmit = (noteData) => {
    if (editingNote) {
      updateNote(noteData);
    } else {
      createNote(noteData);
    }
  };

  // Start editing a note
  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowNoteForm(true);
  };

  // Cancel form
  const handleCancelForm = () => {
    setShowNoteForm(false);
    setEditingNote(null);
  };

  const handleLogout = () => {
    logout();
  };

  // Filter notes based on search term
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (note.tags && note.tags.some(tag =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  return (
    <div>
      {/* New Navbar Design */}
      <nav className={`dashboard-navbar ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="container">
          <div className="dashboard-navbar-content">
            <div className="dashboard-navbar-brand">
               Notes Manager
            </div>
            <div className="dashboard-navbar-user">
              <span className="user-welcome">Welcome, {user?.name}!</span>
              <div className="navbar-actions">
                <button
                  onClick={toggleDarkMode}
                  className="theme-toggle-nav"
                >
                  {isDarkMode ? ' Light' : ' Dark'}
                </button>
                <button onClick={handleLogout} className="logout-btn-nav">
                   Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container">
        {/* Welcome Card */}
        <div className="card">
          <h1>Dashboard</h1>
          <p>Welcome to your Notes Manager! Create and manage your personal notes with images and tags.</p>
          <div className="mt-20">
            <button
              onClick={() => setShowNoteForm(true)}
              className="btn btn-primary"
            >
              Add New Note
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {/* Note Form */}
        {showNoteForm && (
          <NoteForm
            note={editingNote}
            onSubmit={handleNoteSubmit}
            onCancel={handleCancelForm}
          />
        )}

        {/* Notes List */}
        <div className="card">
          <h2>Your Notes ({filteredNotes.length})</h2>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div className="loading"></div>
              <p style={{ marginTop: '10px' }}>Loading your notes...</p>
            </div>
          ) : (
            <NoteList
              notes={filteredNotes}
              onEdit={handleEditNote}
              onDelete={deleteNote}
              searchTerm={searchTerm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;