const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require('./routes/authRouter');
const todoRoutes = require('./routes/todoRouter');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use('/auth',authRoutes);
app.use('/todo',todoRoutes);


const mongoURI = process.env.URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
 

app.get('/',(req,res)=>{
    res.send("Hello");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`HTTPS Server listening on port ${PORT}`);
})