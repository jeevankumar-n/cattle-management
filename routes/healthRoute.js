// routes/healthRoute.js
import express from 'express';
const router = express.Router();

// In-memory data storage for health details
let healthData = [];

// POST route to submit health details
router.post('/', (req, res) => {
  const newHealthEntry = req.body;

  // Validate required fields
  const { name, cattleId, currentDate, temperature } = newHealthEntry;
  if (!name || !cattleId || !currentDate || !temperature) {
    return res.status(400).send('Missing required fields');
  }

  // Save the new entry
  healthData.push(newHealthEntry);
  console.log('Received new health entry:', newHealthEntry);
  res.status(201).send('Health details submitted successfully');
});

// GET route to fetch all health details for a specific cattle ID
router.get('/:cattleId', (req, res) => {
    const { cattleId } = req.params;
  
    // Filter healthData by cattle ID
    const filteredData = healthData.filter((entry) => entry.cattleId === cattleId);
  
    if (filteredData.length > 0) {
      res.status(200).json(filteredData);  // Send all entries
    } else {
      res.status(404).send('No health entries found for the specified Cattle ID');
    }
  });
export default router;
