import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';

const NoteForm = ({ note, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [removeCurrentImage, setRemoveCurrentImage] = useState(false);

  // Initialize form with note data if editing
  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || '',
        content: note.content || '',
        tags: note.tags ? note.tags.join(', ') : ''
      });
    }
  }, [note]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (file) => {
    setSelectedImage(file);
    setRemoveCurrentImage(false);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setRemoveCurrentImage(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Title and content are required');
      return;
    }

    // Convert tags string to array
    const tagsArray = formData.tags
      ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      : [];

    // Prepare form data for file upload
    const submitData = new FormData();
    submitData.append('title', formData.title.trim());
    submitData.append('content', formData.content.trim());
    submitData.append('tags', JSON.stringify(tagsArray));

    if (selectedImage) {
      submitData.append('image', selectedImage);
    }

    if (note && removeCurrentImage) {
      submitData.append('removeImage', 'true');
    }

    onSubmit(submitData);

    // Reset form
    setFormData({
      title: '',
      content: '',
      tags: ''
    });
    setSelectedImage(null);
    setRemoveCurrentImage(false);
  };

  return (
    <div className="card">
      <h2>{note ? 'Edit Note' : 'Create New Note'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter note title"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Content *</label>
          <textarea
            name="content"
            className="form-control"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter note content"
            rows="6"
            required
          />
        </div>

        {/* Image Upload Component */}
        <ImageUpload
          currentImage={note?.image ? `http://localhost:5000/uploads/${note.image}` : null}
          onImageChange={handleImageChange}
          onImageRemove={handleImageRemove}
        />

        <div className="form-group">
          <label className="form-label">Tags</label>
          <input
            type="text"
            name="tags"
            className="form-control"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Enter tags separated by commas (e.g., work, personal, ideas)"
          />
          <small style={{ color: '#666' }}>
            Separate multiple tags with commas. Tags help in searching and organizing notes.
          </small>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button type="submit" className="btn btn-primary">
            {note ? 'Update Note' : 'Create Note'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;