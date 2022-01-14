import express from 'express';
import { respond } from './responder.js';

const app = express();

app.get('/', (req, res) => {
    respond(res);
})

app.listen(3000, ()=>{
    console.log('Express web app on http://localhost:3000/')
})