import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);


app.get('/',async(req,res)=>{
    res.send('Hello people!!');
})

const startServer = async()=>{
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8080,()=>console.log('Server started running on http://localhost:8080'));
    }catch(err){
        console.log(err);
    }
    
}

startServer();