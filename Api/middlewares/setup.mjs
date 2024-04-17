// middleware to setup the app with the most useful middlwares : 
import express from 'express' // the express package
import dotenv from 'dotenv';
import ejs from 'ejs'; // the templating engine
import morgan from 'morgan'; // logging for dev purposes
import mongoose from 'mongoose';
import compression from 'compression'; // to speed up the app
import bodyParser from 'body-parser'; // parsing incoming requests bodies
import cookieParser from 'cookie-parser'; // to parse cookies from the incoming requests headers 
import helmet from 'helmet'; // add headers 
import cors from 'cors'; // to get data from other servers
import expressSlash from 'express-slash';
import session from 'express-session';
import expressDebug from 'express-debug';
import bcrypt from 'bcrypt';

dotenv.config({ path: './Api/config/env/.env' });
const PORT = process.env.PORT || 8374;
const users = [];
const setup_middleware = (app) =>{
    app.use(express.json());
    app.use(morgan('dev')).use(helmet()).use(compression());
    app.use(express.urlencoded({ extended: false }));
    morgan.token('body', (req, res) => JSON.stringify(req.body));
    app.use(bodyParser.json()).use(cookieParser()).use(cors());
    app.set('view engine', 'ejs');
    
}



export { setup_middleware,PORT };