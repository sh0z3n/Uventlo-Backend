import express from 'express';
import crypto from 'crypto';
import bodyParser from 'body-parser';
import databaseConnection from './Api/config/database.mjs'
import User from './Api/models/User.mjs';
import { setup_middleware } from './Api/middlewares/setup.mjs';



const app = express();
const port = 3000;
setup_middleware(app); 

const apiSecretKey = "test_sk_sxZuGGVKSAF2Xa5FfzVgpq7hAR8cqfZDNk8vhqfI";

app.use(bodyParser.json({
    verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    }
}));

app.post('/webhook', async (req, res) => {
  console.log('Headers:', req.headers);

  const signature = req.get('signature');
  if (!signature) {
    console.error('Missing signature header');
    return res.sendStatus(400);
  }
  console.log('Received signature:', signature);

  const payload = JSON.stringify(req.body);
  console.log('Payload:', payload);

  const computedSignature = crypto.createHmac('sha256', apiSecretKey)
    .update(payload)
    .digest('hex');
  console.log('Computed signature:', computedSignature);

  if ( computedSignature!== signature) {
    console.error('Signature mismatch');
    return res.sendStatus(403);
  }
  const event = req.body;
  const checkout = event.data;
  const plan = checkout.description;
  const userId = req.user._id;
 const user = await User.findById(userId);

  try {
    switch (event.type) {
      case 'checkout.paid':
      user.plan = 'buisness';
	    await user.save();
        break;
      case 'checkout.failed':
        break;
       default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating user with checkout information:", error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
    console.log(`Server is running at http://uventlo.icu:${port}`);
});
