import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { initDB } from './db/db.js';
import usersRouter from './routes/usersRoutes.js';
import authRouter from './routes/authRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import commentRouter from './routes/commentRoutes.js';

dotenv.config();

const app = express();
const httpServer = createServer(app); // wrap express with http server
const PORT = process.env.PORT || 5000;

// In-memory store: userId -> socketId
export const userSockets = new Map();

// Socket.IO setup
export const io = new Server(httpServer, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://10.210.189.24:5173'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('register', (userId) => {
    userSockets.set(String(userId), socket.id);
    console.log(`User ${userId} mapped to socket ${socket.id}`);
  });

  socket.on('disconnect', () => {
    for (const [userId, socketId] of userSockets.entries()) {
      if (socketId === socket.id) {
        userSockets.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});

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
app.use(commentRouter);

// Start server — use httpServer instead of app.listen
initDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => console.log(err));