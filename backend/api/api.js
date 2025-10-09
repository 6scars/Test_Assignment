import User from '../schemas/userSchema.js'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export async function validateInput() {
    try {
        const { email, password } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /[A-Z]/
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Password must contain at least one uppercase letter.' });
        }
        next();

    } catch (err) {
        return res.status(200).json({ message: 'Server error during validation' })
    }
}

export async function hashPassword(req, res, next) {
    try {
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10)
        req.body.hashedPassword = hashedPassword;
        console.log(hashedPassword)
        next();
    } catch (err) {
        return res.status(500).json({ message: 'hashPasswordError', err })
    }
}

export async function registerUser(req, res, next) {
    try {
        if (mongoose.connection.readyState !== 1) { // 1 = connected
            return res.status(500).json({ message: 'Database not connected' });
        }
        const email = req.body.email;
        const hashedPassword = req.body.hashedPassword;
        const user = new User({ email, password: hashedPassword })

        await user.save();
        req.redirectTo = "/login"
        req.mess = "user registered";
        next();
    } catch (err) {
        console.log('REGISTER-USER ERROR', err)
        return res.status(400).json({ message: "email already existed" })
    }
}

export async function login(req, res, next) {
    return 0;
}