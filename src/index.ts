import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import mongoose from 'mongoose';
import router from './router';

const app =express();
app.use(cors({
    credentials:true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080,()=>{
    console.log('Server Running on http://localhost:8080');
})



const MONGODB_URL = "mongodb+srv://neeraj-gs:A3EHziMcpdIJ70lx@rest-api.5iwg3sr.mongodb.net/?retryWrites=true&w=majority"

mongoose.Promise = Promise; //glbal js promise
mongoose.connect(MONGODB_URL);
mongoose.connection.on('error',(error:Error) => console.log(console.error()));

app.use('/',router)