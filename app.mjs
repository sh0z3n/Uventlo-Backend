import express from 'express';
import { setup_middleware, PORT } from './Api/middlewares/setup.mjs';
import databaseConnection from './Api/config/database.mjs'
import aiRouter from './Api/routes/aiRoutes.mjs';
import userRouter from './Api/routes/userRouter.mjs';
import { sendWelcomeEmail } from './Api/services/emailService.mjs';
import eventRouter from './Api/routes/eventRoutes.mjs';
import taskRouter from './Api/routes/taskRoutes.mjs';
import ticketRouter from './Api/routes/ticketRoutes.mjs';
import floorRouter from './Api/routes/floorRoutes.mjs';
import passRouter from './Api/routes/authRoutes.mjs';
import { createServer} from 'http'
// import feedbackRouter from './Api/routes/feedbackRoutes.mjs';
import jwt from 'jsonwebtoken'
import { authMiddleware , isAdmin } from './Api/middlewares/authMiddleware.mjs';
import paymentRoutes from './Api/routes/paymentRoute.mjs';
import  Server  from "socket.io";
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import paymentRouter from "./Api/routes/paymentRoute.mjs"
import  createLiveStream  from './Api/utils/livestream.mjs';
// import googleAuthRouter from './Api/routes/google.mjs';
import { OAuth2Client } from 'google-auth-library';
import User from './Api/models/User.mjs';
import cors from 'cors';
import dotenv from 'dotenv';
import { credentials } from 'amqplib';
const app = express();
setup_middleware(app); // done
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
dotenv.config();
app.use(cors(corsOptions));
app.options('*', cors()); //

app.use('/floor',floorRouter); // yet the auth
app.use('/users' ,userRouter); // yet the auth 
app.use('/event',eventRouter); // yet the auth too 
app.use('/task',taskRouter); // yet the auth
// app.use('/feedback',feedbackRouter); not finsihed yet
app.use('/ticket',ticketRouter); // yet the auth too
app.use('/ai',aiRouter); // done
app.use("/auth",passRouter);
app.use("/payment",paymentRouter);
// app.use('/lynda,',googleAuthRouter);


app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}. Check here: http://localhost:${PORT}/`);
});

app.get("/",(req,res)=>{
res.send('<center><h1> Uventlo is up !</h1></center>')});


// app.get('/files', (req, res) => {
//   fs.readdir(path.join(__dirname, '/Api/uploads'), (err, files) => {
//       console.log(__dirname)
//       if (err) {
//           return res.status(500).send('Unable to scan files.');
//       }
//       res.render('files', { files });
//   });
// });

// app.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//   }
//   res.send(`File uploaded successfully: ${req.file.filename}`);
// });


app.get('/admin', authMiddleware, isAdmin, (req, res) => { 
  
  console.log("admin is here ");
  res.send(req.user.role);
});