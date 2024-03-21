import express from 'express'
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
app.use(morgan('dev'));
morgan.token('body', (req, res) => JSON.stringify(req.body));

dotenv.config({path: './Api/config/env/.env' });

let PORT = process.env.PORT;

app.get("/",(Request,Response)=>{
  Response.send("<h1>uwu</h1>")
})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT} check here : http://localhost:${PORT}/`);
});



// app.set('view engine', 'ejs');
//
// // Database connection
// const dbURI = process.env.MONGODB_URI;
// mongoose
//   .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
//   .then((result) => app.listen(3000))
//   .catch((err) => console.log(err));
//
