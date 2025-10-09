import User from './userSchema.js'
import mongoose from 'mongoose'
export async function registerUser(req, res, next) {
    try {
        if (mongoose.connection.readyState !== 1) { // 1 = connected
            return res.status(500).json({ message: 'Database not connected' });
        }
        const { email, password } = req.body;
        const user = new User({ email, password })
        await user.save();

        req.mess = { message: "user registered" }
        next();
    } catch (err) {
        console.log('REGISTER-USER ERROR', err)
        return res.status(400).json({ message: "user NOT registered" })
    }
}