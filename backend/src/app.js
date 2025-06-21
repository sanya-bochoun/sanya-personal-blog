// backend/src/app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import userRoutes from './routes/userRoutes.js'; // ตัวอย่าง route

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // อนุญาตให้ frontend เรียก API ได้
app.use(express.json()); // สำหรับ parse JSON body ใน request

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// app.use('/api/users', userRoutes); // ตัวอย่างการใช้งาน route

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});