import express from 'express';
import { setup_middleware, PORT } from './Api/middlewares/setup.mjs';
import databaseConnection from '../Uventlo-Backend/Api/config/database.mjs';
import aiBot from './Api/middlewares/aiBot.mjs';
import userRouter from './Api/routes/userRouter.mjs';
import { sendWelcomeEmail } from './Api/services/emailService.mjs';
import eventRouter from './Api/routes/eventRoutes.mjs';
import taskRouter from './Api/routes/taskRoutes.mjs';
import ticketRouter from './Api/routes/ticketRoutes.mjs';
import floorRouter from './Api/routes/floorRoutes.mjs';
import { createServer} from 'http'
// import feedbackRouter from './Api/routes/feedbackRoutes.mjs';
import  Server  from "socket.io";
const app = express();

setup_middleware(app); // done
app.use('/floor',floorRouter); // yet the auth
app.use('/users',userRouter); // yet the auth 
app.use('/event',eventRouter); // yet the auth too 
app.use('/task',taskRouter); // yet the auth
// app.use('/feedback',feedbackRouter); not finsihed yet
app.use('/ticket',ticketRouter); // yet the auth too
app.post('/email',sendWelcomeEmail) // done
app.use('/ai',aiBot); // done



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}. Check here: http://localhost:${PORT}/`);
});







// app.get('/admin-only', authMiddleware, isAdmin, (req, res) => {  // just for jawad so he can start testing the auth
//   res.status(200).json({ message: 'Admin access granted' });
// });