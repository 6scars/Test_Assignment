import express from 'express';
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
dotenv.config()


const router = express.Router();
const MONGO_URI = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI)
router.get('/registerUser', (req, res) => {
    console.log(req.body)
    res.end()
})

export default router;