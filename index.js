import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is runnassing');
});

// Define your PostgreSQL connection configuration
// const client = new Client({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
// });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});