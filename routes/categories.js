import express from 'express';
import Category from '../models/Category.js';

const router = express.Router();

// GET all categories
router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// POST add category
router.post('/', async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.status(201).json(category);
});

// PUT update category
router.put('/:id', async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(category);
});

// DELETE category
router.delete('/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;
