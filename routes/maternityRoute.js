// routes/maternityRoute.js
import express from 'express';
import db from '../db.js'; // Ensure this path is correct

const router = express.Router();

// POST route to save maternity details
router.post('/', async (req, res) => {
    const {
        cowId,
        calfId,
        calfGender,
        lactationNo,
        calvingDate,
        calvingDifficultyScore,
        bcsAtCalving,
        diagnosis,
        observations
    } = req.body;

    // Validate required fields
    if (!cowId || !calfId || !calfGender || !lactationNo || !calvingDate) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // SQL query to insert data into the maternity_details table
    const query = `INSERT INTO maternity_details (cowId, calfId, calfGender, lactationNo, calvingDate, calvingDifficultyScore, bcsAtCalving, diagnosis, observations)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Execute the query
    db.query(query, [
        cowId,
        calfId,
        calfGender,
        lactationNo,
        calvingDate,
        calvingDifficultyScore,
        bcsAtCalving,
        diagnosis,
        observations
    ], (error, results) => {
        if (error) {
            console.error('Error saving maternity entry:', error); // Log detailed error
            return res.status(500).json({ error: 'Failed to save data', details: error.message });
        }
        res.status(201).json({ message: 'Maternity details submitted successfully' });
    });
});

// GET route to fetch all maternity details for a specific cow ID
// GET route to fetch all maternity details for a specific cow ID
router.get('/:cowId', (req, res) => {
    const { cowId } = req.params;
    console.log('Cow ID requested:', cowId); // Log requested cowId

    // SQL query to fetch maternity data, excluding diagnosis and observations
    const query = `SELECT calfId, calfGender, calvingDate, lactationNo, calvingDifficultyScore, bcsAtCalving 
                   FROM maternity_details WHERE cowId = ?`;
    
    db.query(query, [cowId], (error, results) => {
        if (error) {
            console.error('Error fetching maternity data:', error);
            return res.status(500).json({ error: 'Failed to fetch data', details: error.message });
        }
        if (results.length > 0) {
            res.status(200).json(results); // Send all entries
        } else {
            console.log('No entries found for cowId:', cowId); // Log if no entries found
            res.status(404).json({ error: 'No maternity entries found for the specified Cow ID' });
        }
    });
});


export default router;
