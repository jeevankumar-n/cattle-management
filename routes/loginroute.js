// loginroute.js
import express from 'express';
import connection from '../db.js'; // Import the database connection
import jwt from 'jsonwebtoken';
const router = express.Router();

// Login Route
router.post('/', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM login WHERE username = ? AND password = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length > 0) {
      const token = jwt.sign({ role: 'admin', username: results[0].username }, 'jwt_secret_key', { expiresIn: '1d' });

      // Set the token in a cookie
      res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax' });

      return res.json({ loginStatus: true, message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});

// Signup Route
router.post('/signup', (req, res) => {
  const { username, password } = req.body;

  const query = `
    INSERT INTO login (username, password) 
    VALUES (?, ?) 
    ON DUPLICATE KEY UPDATE password = VALUES(password)
  `;

  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error inserting/updating user:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(201).json({ message: 'User signed up successfully' });
  });
});

export default router;
