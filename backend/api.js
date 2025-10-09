import User from './userSchema.js'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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
        req.mess =  "user registered" ;
        next();
    } catch (err) {
        console.log('REGISTER-USER ERROR', err)
        return res.status(400).json({ message: "user NOT registered" })
    }
}