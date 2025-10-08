import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()



const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('hello world')
})



app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`)
})