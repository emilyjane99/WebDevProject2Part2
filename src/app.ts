import http, { IncomingMessage, ServerResponse } from "http";
import express from 'express';
import { usersRouter } from './routes/userRoute';
import bodyParser from 'body-parser';
import path from 'path';

let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/Users', usersRouter);

app.use('/', (req,res,next)=>{ 
    //app.use(express.static('public/html'));
    res.sendFile(path.join(process.cwd(), '../public/html/help.html'));
   // res.sendFile(path.join(process.cwd(), 'public/html/help.css'));
    //res.status(404).send('Sorry, page not found');
});

app.listen(3000);