
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config({ path: "./.env" })

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);


// const CONNECTION_URL = 'mongodb+srv://betabanta:betabanta123123@cluster0.z9aux.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.set('useFindAndModify', false);