const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Note = require('../models/Note');
const auth = require('../middleware/auth');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get all notes for user
router.get('/', auth, async (req, res) => {
  try {
    console.log('Fetching notes for user:', req.user._id);
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    console.log(`Found ${notes.length} notes for user ${req.user._id}`);
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new note with optional image
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    console.log('Creating note for user:', req.user._id);
    console.log('Note data:', req.body);
    console.log('File:', req.file);

    const { title, content, tags } = req.body;

    // Validation
    if (!title || !content) {
      // Delete uploaded file if validation fails
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const note = new Note({
      title,
      content,
      tags: tags ? JSON.parse(tags) : [],
      image: req.file ? req.file.filename : null,
      user: req.user._id
    });

    await note.save();
    console.log('Note created successfully:', note._id);
    res.status(201).json(note);
  } catch (error) {
    // Delete uploaded file if error occurs
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update note with optional image
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    console.log('Updating note:', req.params.id);
    console.log('Update data:', req.body);
    console.log('File:', req.file);

    const { title, content, tags, removeImage } = req.body;

    let note = await Note.findById(req.params.id);

    if (!note) {
      // Delete uploaded file if note not found
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      console.log('Note not found:', req.params.id);
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check if user owns the note
    if (note.user.toString() !== req.user._id.toString()) {
      // Delete uploaded file if unauthorized
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      console.log('Unauthorized access attempt for note:', req.params.id);
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Handle image removal or update
    let imagePath = note.image;
    if (removeImage === 'true' && note.image) {
      // Delete old image file
      const oldImagePath = path.join('uploads', note.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      imagePath = null;
    } else if (req.file) {
      // Delete old image if exists and new image uploaded
      if (note.image) {
        const oldImagePath = path.join('uploads', note.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      imagePath = req.file.filename;
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title: title || note.title,
        content: content || note.content,
        tags: tags ? JSON.parse(tags) : note.tags,
        image: imagePath
      },
      { new: true, runValidators: true }
    );

    console.log('Note updated successfully:', note._id);
    res.json(note);
  } catch (error) {
    // Delete uploaded file if error occurs
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete note
router.delete('/:id', auth, async (req, res) => {
  try {
    console.log('Deleting note:', req.params.id);

    const note = await Note.findById(req.params.id);

    if (!note) {
      console.log('Note not found for deletion:', req.params.id);
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check if user owns the note
    if (note.user.toString() !== req.user._id.toString()) {
      console.log('Unauthorized deletion attempt for note:', req.params.id);
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Delete associated image file if exists
    if (note.image) {
      const imagePath = path.join('uploads', note.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Note.findByIdAndDelete(req.params.id);
    console.log('Note deleted successfully:', req.params.id);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;