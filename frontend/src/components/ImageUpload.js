import React, { useRef, useState } from 'react';

const ImageUpload = ({ currentImage, onImageChange, onImageRemove }) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(currentImage || null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Pass file to parent
      onImageChange(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageRemove();
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="form-group">
      <label className="form-label">Note Image (Optional)</label>

      {imagePreview ? (
        <div style={{ marginBottom: '15px' }}>
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
              maxWidth: '100%'
            }}
          >
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '200px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                background: 'rgba(220, 53, 69, 0.9)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              ×
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleButtonClick}
          style={{
            border: '2px dashed #ddd',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'border-color 0.3s',
            backgroundColor: '#f8f9fa'
          }}
          onMouseEnter={(e) => e.target.style.borderColor = '#007bff'}
          onMouseLeave={(e) => e.target.style.borderColor = '#ddd'}
        >
          <div style={{ fontSize: '48px', color: '#6c757d', marginBottom: '10px' }}>
            📷
          </div>
          <p style={{ margin: 0, color: '#6c757d' }}>
            Click to upload an image
          </p>
          <small style={{ color: '#6c757d' }}>
            Supports JPG, PNG, GIF • Max 5MB
          </small>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageUpload;