// server.js
import express from 'express';
import cors from 'cors';
import loginRoute from './routes/loginroute.js';
import milkRoute from './routes/milkRoute.js';
import healthRoute from './routes/healthRoute.js';
import maternityRoute from './routes/maternityRoute.js';


const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // Ensure this matches your frontend URL
  methods: ['GET', 'POST', 'PUT'],
  credentials: true
}));

// Use the routes
app.use('/login', loginRoute);
app.use('/milk', milkRoute);
app.use('/health', healthRoute);
app.use('/maternity', maternityRoute);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
