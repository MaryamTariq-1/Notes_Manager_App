const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Note title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Note content is required'],
    maxlength: [10000, 'Content cannot be more than 10000 characters']
  },
  image: {
    type: String,
    default: null
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [20, 'Tag cannot be more than 20 characters']
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for better search performance
noteSchema.index({ user: 1, createdAt: -1 });
noteSchema.index({ title: 'text', content: 'text', tags: 'text' });

module.exports = mongoose.model('Note', noteSchema);