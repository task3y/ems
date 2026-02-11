import bcrypt from 'bcrypt';
import User from './models/User.js';
import connectToDatabase from './database/database.js';

const userRegister = async () => {
    connectToDatabase();
    try {
        const hashPassword = await bcrypt.hash('Password123', 10);
        const newUser = new User({
            username: 'john',
            email: 'john@example.com',
            password: hashPassword,
            role: 'admin',
        });
        await newUser.save();
        console.log('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error);
    }
};
userRegister();