const express = require('express');
const router = express.Router();
const Show = require('../models/Show');

// Get all shows
router.get('/', async (req, res) => {
  try {
    const shows = await Show.find().sort({ createdAt: -1 });
    res.json(shows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single show by ID
router.get('/:id', async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }
    res.json(show);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new show
router.post('/', async (req, res) => {
  const show = new Show({
    title: req.body.title,
    type: req.body.type,
    genre: req.body.genre,
    totalEpisodes: req.body.totalEpisodes,
    watchedEpisodes: req.body.watchedEpisodes || 0,
    status: req.body.status || 'Plan to Watch',
    rating: req.body.rating || 0,
    review: req.body.review || '',
    imageUrl: req.body.imageUrl || '',
    streamingLink: req.body.streamingLink || ''
  });

  try {
    const newShow = await show.save();
    res.status(201).json(newShow);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a show
router.put('/:id', async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    Object.keys(req.body).forEach(key => {
      show[key] = req.body[key];
    });

    const updatedShow = await show.save();
    res.json(updatedShow);
  } catch (error) {
    console.error("SAVE ERROR:", error);   // log full error in backend terminal
  res.status(400).json({ message: error.message, errors: error.errors });
  }
});

// Delete a show
router.delete('/:id', async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }
    await show.deleteOne();
    res.json({ message: 'Show deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;