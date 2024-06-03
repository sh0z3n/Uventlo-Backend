const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Your Chargily Pay Secret key, will be used to calculate the Signature
const apiSecretKey = 'test_sk_sxZuGGVKSAF2Xa5FfzVgpq7hAR8cqfZDNk8vhqfI';

// Middleware to capture the raw body
app.use(bodyParser.json({
    verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    }
}));

app.post('/webhook', async (req, res) => {
    // Log all headers
    console.log('Headers:', req.headers);
  
    // Retrieve and log the signature
    const signature = req.get('signature');
    if (!signature) {
      console.error('Missing signature header');
      return res.sendStatus(400);
    }
    console.log('Received signature:', signature);
  
    // Log the exact received payload
    const rawBody = req.rawBody;
    console.log('Raw Body:', rawBody);
  
    // Compute and log the HMAC
    const computedSignature = crypto.createHmac('sha256', apiSecretKey)
      .update(rawBody)
      .digest('hex');
    console.log('Computed signature:', computedSignature);
  
    // Compare signatures and handle errors
    if (computedSignature !== signature) {
      console.error('Signature mismatch');
      return res.sendStatus(403);
    }
  
    const event = req.body;
    console.log('Event:', event);
  
    const checkout = event.data;
    console.log('Checkout:', checkout);
    const userid = req.body.id
    try {
      switch (event.type) {
        case 'checkout.paid':
          // await User.findByIdAndUpdate(userId, {
          //   lastCheckout: new Date(),
          //   $inc: { totalCheckouts: 1 },
          //   lastCheckoutAmount: checkout.amount,
          //   plan: 'vip'
          // }, { new: true });
          break;
  
        case 'checkout.failed':
          // await User.findByIdAndUpdate(userId, {
          //   lastFailedCheckout: new Date(),
          //   $inc: { totalFailedCheckouts: 1 }
          // }, { new: true });
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
    console.log(`Server is running at http://localhost:${port}`);
});
