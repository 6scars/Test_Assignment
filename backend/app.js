import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './router.js'
import { MongoClient } from 'mongodb'
dotenv.config()



const PORT = process.env.PORT;
const app = express();
const MONGO_URI = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI)

app.use(cors());
app.use(express.json())


async function connectDB() {
    try {
        await client.connect(MONGO_URI);
        console.log('Succesfully connected to MongoDB')
        const db = client.db('job-assignment');
        return db;
    } catch {
        console.log('Failed to connect to MongoDB', err)
    }

}
let db;
connectDB().then((database) => {
    db = database;
    app.listen(PORT, () => {
        console.log(`server running on http://localhost:${PORT}`)
    })
})

app.get('/', async (req, res) => {
    res.send('hello world')
})



