const mongoose = require('mongoose');
const slugify = require('slugify');

const travelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [50, 'Title can not be more than 50 characters'],
  },
  cityStart: {
    type: String,
    required: [true, 'Please add the first city of your trip'],
    trim: true,
  },
  cityEnd: {
    type: String,
    required: [true, 'Please add the last city of your trip'],
    trim: true,
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

travelSchema.pre('save', function (next) {
  this.slug = slugify(this.title.toLowerCase());
  console.log(`ici le slug: ${this.slug}`);
  next();
});

module.exports = mongoose.model('Travel', travelSchema);
