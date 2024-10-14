// routes/milkRoute.js
import express from 'express';
const router = express.Router();

// In-memory data storage
let milkData = [];

// POST route to handle milk details submission
router.post('/', (req, res) => {
  const newMilkEntry = req.body;

  // Validate input
  if (!newMilkEntry.name || !newMilkEntry.cattleId || !newMilkEntry.date) {
    return res.status(400).send('Missing required fields');
  }

  // Save the new entry
  milkData.push(newMilkEntry);
  console.log('Received new milk entry:', newMilkEntry);
  res.status(201).send('Milk details submitted successfully');
});

// GET route to fetch all milk data for a specific cattle ID
router.get('/:cattleId', (req, res) => {
  const { cattleId } = req.params;
  const filteredData = milkData.filter(entry => entry.cattleId === cattleId);  // Get all entries with same cattleId

  if (filteredData.length > 0) {
    res.status(200).json(filteredData);  // Return all entries as JSON
  } else {
    res.status(404).send('No entries found for the specified Cattle ID');
  }
});

export default router;
