import express from 'express';
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

import {registerUser, hashPassword} from '../api/api.js' 
dotenv.config()


const router = express.Router();
router.post('/registerUser', hashPassword, registerUser, (req, res, next) => {
    try{
        res.status(201).json({message: req.mess, redirectTo: req.redirectTo})
        return 0
    }catch(err){
        return res.status(500).json({message:'registerUser error '})
    }
})

export default router;