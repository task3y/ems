import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import authRouter from './routes/auth.js';
import connectToDatabase from './database/database.js';
import departmentRouter from './routes/department.js';

connectToDatabase(); // Connect to the database
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);

const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
