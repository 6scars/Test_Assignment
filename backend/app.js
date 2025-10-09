import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './router/router.js'
import mongoose from 'mongoose'
import morgan from 'morgan'
dotenv.config()



const PORT = process.env.PORT;
const app = express();
const MONGO_URL = process.env.MONGO_URL;

app.use(morgan())
app.use(cors());
app.use(express.json())


async function connectDB() {
    try {
        await mongoose.connect(MONGO_URL)
        console.log('Succesfully connected to MongoDB')
        return db;
    } catch(err) {
        console.log('Failed to connect to MongoDB', err)
    }

}
let db;
connectDB().then((database) => {
    db = database;
    app.listen(PORT, () => {
        console.log(`server running on http://localhost:${PORT}`)
    })


    app.get('/', async (req, res) => {
        res.send('hello world')
    })
    app.use('/api', router);

})



