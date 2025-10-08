import express from 'express';
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
dotenv.config()


const router = express.Router();
const MONGO_URI = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI)
router.post('/registerUser', (req, res) => {
    try{
        console.log(req.body)
        res.status(201).json({message:"user registered"})
    }catch(err){
        console.log('REGISTER-USER ERROR',err)
        res.status(400).json({message:"user NOT registered"})
    }

})

export default router;