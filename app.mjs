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
import passRouter from './Api/routes/passRoutes.mjs';
import path from 'path';
import url from 'url';
import fs from 'fs';

import { createServer} from 'http'
// import feedbackRouter from './Api/routes/feedbackRoutes.mjs';
import { authMiddleware , isAdmin } from './Api/middlewares/authMiddleware.mjs';
import paymentRoutes from './Api/routes/paymentRoute.mjs';
import  Server  from "socket.io";
import paymentRouter from "./Api/routes/paymentRoute.mjs"
import  createLiveStream  from './Api/utils/livestream.mjs';
const app = express();
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
app.use(express.static(path.join(__dirname, 'views')));
const imagePath = path.join(__dirname, 'views', 'art.png');
const imageData = fs.readFileSync(imagePath, { encoding: 'base64' });


setup_middleware(app); // done
app.use('/floor',floorRouter); // yet the auth
app.use('/users' ,userRouter); // yet the auth 
app.use('/event',eventRouter); // yet the auth too 
app.use('/task',taskRouter); // yet the auth
// app.use('/feedback',feedbackRouter); not finsihed yet
app.use('/ticket',ticketRouter); // yet the auth too
app.post('/email',sendWelcomeEmail) // done
app.use('/ai',aiRouter); // done
app.use("/auth",passRouter);
app.use("/payment",paymentRouter);

// app.use('/api/payment', paymentRoutes); // the eth not working ( we don't have enough coins to test :( )
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}. Check here: http://localhost:${PORT}/`);
});

app.post("/",(req,res)=>{
  console.log(req.body)
});


app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Uventlo</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
        <style>
            body {
                background-color: #724efe; /* Dark background */
                color: #d4a5ff; /* Light purple text */
                font-family: 'Roboto', sans-serif; /* New font */
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                text-align: center;
            }
            h1 {
                font-size: 3em;
                margin-bottom: 20px;
                font-weight: 700;
                background: linear-gradient(to right, #724efe, white); /* Gradient from purple to white */
                -webkit-background-clip: text; /* Clip text to the background area */
                -webkit-text-fill-color: transparent; /* Set text fill color to transparent */
            }
            .container {
                background: #282828;
                padding: 40px;
                border-radius: 15px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
                max-width: 600px;
                width: 90%;
                margin: auto;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            img {
                max-width: 300px;
                border-radius: 10px;
                margin: 20px 0;
            }
            .btn {
                background: linear-gradient(73deg, #fff, #724efe); /* Adjust button color */
                color: #1a1a1a;
                border: none;
                padding: 15px 30px;
                font-size: 1.2em;
                border-radius: 5px;
                cursor: pointer;
                text-decoration: none;
                display: inline-block;
                transition: background 0.9s ease; /* Change transition to apply to background */
                margin-top: 20px;
            }
            .btn:hover {
                background: linear-gradient(45deg, #724efe, #724efe); /* Adjust button color on hover */
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to the Server Side of UVENTLO</h1>
            <img src="data:image/png;base64,${imageData}" alt="UVENTLO Logo">
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="btn">Lunch Uventlo</a>
        </div>
    </body>
    </html>
  `);
});


app.get('/admin', authMiddleware, isAdmin, (req, res) => { 
  console.log("admin is here ");
  res.send(req.user.role);
});