import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UseRoutes from './router/UserRouter.js';
import localtunnel from 'localtunnel';

dotenv.config()
const app = express();
const PORT = process.env.PORT  || 3001;


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/',UseRoutes);

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
},()=>{
    console.log("Database connected");
})


app.listen(PORT, ()=>{
    console.log(`Camry Server is Running at ${PORT}`);
    const tunnel = localtunnel(PORT, { subdomain: 'tupsystem-api'} ,(err, tunnel) => {
        console.log('heyo');
    });

    tunnel.on('close', function() {
        // When the tunnel is closed
    });

})

