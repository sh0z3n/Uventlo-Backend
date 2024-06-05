import express from 'express';
import { ChargilyClient } from '@chargily/chargily-pay';
import User from '../models/User.mjs';
import fetch from 'node-fetch';
import crypto from 'crypto';
import bodyParser from 'body-parser';
const apiSecretKey = "test_sk_sxZuGGVKSAF2Xa5FfzVgpq7hAR8cqfZDNk8vhqfI";

const router = express.Router();
const client = new ChargilyClient({
  api_key: "test_sk_sxZuGGVKSAF2Xa5FfzVgpq7hAR8cqfZDNk8vhqfI",
  mode: "test"
});
router.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));
router.post('/offres', async (req, res) => {
  try {
    const { name , description } = req.body;
    const product = await client.createProduct({ name });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create offre' });
  }
});

router.post('/products/:productId', async (req, res) => {
  try {
    const { amount, currency, metadata } = req.body;
    const { productId } = req.params;
    const price = await client.createPrice({ amount, currency, product_id: productId, metadata });
    res.status(201).json(price);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create price' });
  }
});

router.post('/checkouts', async (req, res) => {
  try {
    const { items , description } = req.body;
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer test_sk_sxZuGGVKSAF2Xa5FfzVgpq7hAR8cqfZDNk8vhqfI`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
        description,
        success_url: "http://uventlo.icu:1337/profile"
      }),
    };
    const response = await fetch("https://pay.chargily.net/test/api/v2/checkouts", options);
    const checkout = await response.json();
    res.status(201).json(checkout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create checkout' });
  }
});

router.post('/webhook', async (req, res) => {
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

  if (computedSignature !== signature) {
    console.error('Signature mismatch');
    return res.sendStatus(403);
  }
  const userId = req.user._id
  const event = req.body;
  const checkout = event.data;
  try {
    switch (event.type) {
      case 'checkout.paid':
        const offer = checkout.description
        console.log(offer);
        await User.findByIdAndUpdate(userId, {
          plan:offer,
        }, { new: true });
        break;

      case 'checkout.failed':
        await User.findByIdAndUpdate(userId, {
        }, { new: true });
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

export default router;