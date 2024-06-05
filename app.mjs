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
import feedbackRouter from './Api/routes/feedbackRoute.mjs';
import { authMiddleware , isAdmin } from './Api/middlewares/authMiddleware.mjs';
import paymentRouter from "./Api/routes/paymentRoute.mjs"
import cors from 'cors'

const app = express();
setup_middleware(app); // done

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],

};

app.use(cors(corsOptions));
app.options('*', cors()); 

app.use('/floor',floorRouter);
app.use('/users' ,userRouter); 
app.use('/event',eventRouter);  
app.use('/task',taskRouter); 
app.use('/feedback',feedbackRouter); // it needs front-end integration of next-brodcast
app.use('/ticket',ticketRouter); // yet the auth too
app.use('/ai',aiRouter); 
app.use("/auth",passRouter); 
app.use("/payment",paymentRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}. Check here: http://uventlo.icu:${PORT}/`);
});

app.get("/",(req,res)=>{
res.send('<center><h1> Uventlo is up test it Now !! </h1></center>')});

// a route to check the auth 
app.get('/admin', authMiddleware, isAdmin, (req, res) => { 
  console.log("admin is here ");
  res.send(req.user.role);
});