const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
// available routes

app.use('/auth',require('./routes/auth'));
app.use('/hotels',require('./routes/hotelsbackend'));
app.use('/rooms',require('./routes/rooms'));
app.use('/payment',require('./routes/payment'));

app.listen(port,()=>{
    console.log(`Hotello is listening on port ${port}`);
})