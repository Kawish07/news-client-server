import express from 'express';
import News from '../models/News.js';
import Category from '../models/Category.js';

const router = express.Router();

// GET all news
router.get('/', async (req, res) => {
  const news = await News.find().populate('category');
  res.json(news);
});

// GET single news
router.get('/:id', async (req, res) => {
  const news = await News.findById(req.params.id).populate('category');
  if (!news) return res.status(404).json({ message: 'Not found' });
  res.json(news);
});

// POST add news
router.post('/', async (req, res) => {
  const news = new News(req.body);
  await news.save();
  res.status(201).json(news);
});

// PUT update news
router.put('/:id', async (req, res) => {
  const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(news);
});

// DELETE news
router.delete('/:id', async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;
