import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});