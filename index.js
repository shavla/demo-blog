import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB } from './db/db.js';
import usersRouter from './routes/usersRoutes.js';
import authRouter from './routes/authRoutes.js';
import blogRouter from './routes/blogRoutes.js';

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
app.use(usersRouter);
app.use(authRouter);
app.use(blogRouter);

// Start server
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err =>
  console.log(err)
)