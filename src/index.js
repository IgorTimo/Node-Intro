import express from 'express';

const app = express();

app.get('/', (req, res) => {
    //http://localhost:3000/
    res.send("Hello from server");
})

app.listen(3000, ()=>{
    console.log('Express web app on http://localhost:3000/')
})