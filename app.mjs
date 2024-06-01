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
import { createServer} from 'http'
// import feedbackRouter from './Api/routes/feedbackRoutes.mjs';
import { authMiddleware , isAdmin } from './Api/middlewares/authMiddleware.mjs';
import paymentRoutes from './Api/routes/paymentRoute.mjs';
import  Server  from "socket.io";
import paymentRouter from "./Api/routes/paymentRoute.mjs"
import  createLiveStream  from './Api/utils/livestream.mjs';
const app = express();
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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}. Check here: http://localhost:${PORT}/`);
});

app.get("/",(req,res)=>{
res.send('hello world')});

app.get('/admin', authMiddleware, isAdmin, (req, res) => { 
  console.log("admin is here ");
  res.send(req.user.role);
});