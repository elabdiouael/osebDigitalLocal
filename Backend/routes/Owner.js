const express = require('express');
const Owner = require('../table-shema/Owner.schema');

const router = express.Router();

// Get all owners
router.get('/', async (req, res) => {
  try {
    const owners = await Owner.find();
    res.json(owners);
  } catch (error) {
    console.error('Error fetching owners:', error);
    res.status(500).json({ error: 'An error occurred while fetching owners.' });
  }
});

// Add an owner
router.post('/', async (req, res) => {
  const newOwnerData = req.body;

  try {
    const newOwner = await Owner.create(newOwnerData);
    res.json(newOwner);
  } catch (error) {
    console.error('Error adding owner:', error);
    res.status(500).json({ error: 'An error occurred while adding the owner.' });
  }
});

// Update an owner
router.put('/:id', async (req, res) => {
  const ownerId = req.params.id;
  const updatedOwnerData = req.body;

  try {
    const updatedOwner = await Owner.findByIdAndUpdate(ownerId, updatedOwnerData, { new: true });
    res.json(updatedOwner);
  } catch (error) {
    console.error('Error updating owner:', error);
    res.status(500).json({ error: 'An error occurred while updating the owner.' });
  }
});

// Delete an owner
router.delete('/:id', async (req, res) => {
  const ownerId = req.params.id;

  try {
    const deletedOwner = await Owner.findByIdAndDelete(ownerId);
    res.json(deletedOwner);
  } catch (error) {
    console.error('Error deleting owner:', error);
    res.status(500).json({ error: 'An error occurred while deleting the owner.' });
  }
});

module.exports = router;
