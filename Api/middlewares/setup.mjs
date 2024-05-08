// middleware to setup the app with the most useful middlwares : 
import express from 'express' 
import dotenv from 'dotenv';
import ejs from 'ejs'; 
import morgan from 'morgan'; 
import mongoose from 'mongoose';
import compression from 'compression'; 
import bodyParser from 'body-parser'; 
import cookieParser from 'cookie-parser'; 
import helmet from 'helmet'; 
import cors from 'cors'; 
import expressSlash from 'express-slash';
import session from 'express-session';
import expressDebug from 'express-debug';
import bcrypt from 'bcrypt';
import rateLimit from 'express-rate-limit';


dotenv.config({ path: './Api/config/env/.env' });
const PORT = process.env.PORT || 8374;
const users = [];
const authLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20, // limit each IP to 20 requests 
    message: 'Too many requests from this IP, please try again later.',
  });
const setup_middleware = (app) =>{
    app.use(express.json());
    app.use(morgan('dev')).use(helmet()).use(compression());
    app.use(express.urlencoded({ extended: false }));
    app.use(authLimiter);
    morgan.token('body', (req, res) => JSON.stringify(req.body));
    app.use(bodyParser.json()).use(cookieParser()).use(cors());
    app.set('view engine', 'ejs');
    app.use(expressSlash());
}



export { setup_middleware,PORT };