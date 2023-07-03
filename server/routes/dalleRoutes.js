import * as dotenv from 'dotenv';
import express from 'express';
import { Configuration,OpenAIApi } from 'openai'; 

dotenv.config();

const router = express.Router();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

router.route('/').get((req,res)=>{
    res.send('Hello!!');
});

router.route('/').post(async(req,res)=>{
    try {
        const {prompt} = req.body;
        const aiResponse = await openai.createImage({
            prompt,
            n:1,
            size:'1024x1024',
            response_format:'b64_json',
        });
        const img = aiResponse.data.data[0].b64_json;
        res.status(200).json({photo:img});
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message);
    }
})

export default router;