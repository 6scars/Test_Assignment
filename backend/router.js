import express from 'express';
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

import {registerUser} from './api.js' 
dotenv.config()


const router = express.Router();
router.post('/registerUser', registerUser, (req, res, next) => {
    try{
        res.status(201).json(req.mess)
    }catch(err){
        res.status(500).json({message:'registerUser error '})
    }
})

export default router;