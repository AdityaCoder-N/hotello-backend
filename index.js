
// available routes
const app = require('./app');
const port = process.env.PORT || 5001;


app.get('/',(req,res)=>{
    res.send("<h2>Working</h2>")
})

app.use('/auth',require('./routes/auth'));
app.use('/hotels',require('./routes/hotelsbackend'));
app.use('/rooms',require('./routes/rooms'));
app.use('/payment',require('./routes/payment'));

app.listen(port,()=>{
    console.log(`Hotello is listening on port ${port}`);
})