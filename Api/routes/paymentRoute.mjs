import express from 'express'
import { ChargilyClient } from '@chargily/chargily-pay';
import User from '../models/User.mjs';
import fetch from 'node-fetch';

const apiSecretKey = "test_sk_ThrFkmgj93zg4F2AL8G06BPS9AAcIXjTKiQgZxDy"

const router = express.Router()
const client = new ChargilyClient(

  {
    api_key:"test_sk_ThrFkmgj93zg4F2AL8G06BPS9AAcIXjTKiQgZxDy",
    mode:"test"

  }
);

router.post('/offres', async (req, res) => {
  try {
    const { name, description, metadata } = req.body;
    const product = await client.createProduct({ name, description, metadata });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
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
    const { items, successUrl } = req.body;
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer test_sk_ThrFkmgj93zg4F2AL8G06BPS9AAcIXjTKiQgZxDy`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
        success_url: successUrl
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


router.post('webhook', (req, res) => {
  const signature = req.get('signature');
  const payload = JSON.stringify(req.body);
  if (!signature) {
      return res.sendStatus(400);
  }

  const computedSignature = crypto.createHmac('sha256', apiSecretKey)
      .update(payload)
      .digest('hex');

  if (computedSignature !== signature) {
      return res.sendStatus(403);
  }

  const event = req.body;
  const checkout = event.data;
  const userId = checkout.id;  
  switch (event.type) {
      
      case 'checkout.paid':
          User.findByIdAndUpdate(userId, {
              lastCheckout: new Date(),
              totalCheckouts: { $inc: 1 },
              lastCheckoutAmount: checkout.amount
          }, { new: true })
          .then(user => {
              console.log("User updated with checkout information:", user);
          })
          .catch(error => {
              console.error("Error updating user with checkout information:", error);
          });
          break;

      case 'checkout.failed':
          
          User.findByIdAndUpdate(id, {
              lastFailedCheckout: new Date(), 
              $inc: { totalFailedCheckouts: 1 } 
          }, { new: true })
          .then(user => {
              console.log("User updated with failed checkout information:", user);
          })
          .catch(error => {
              console.error("Error updating user with failed checkout information:", error);
          });
          break;
  }

  res.sendStatus(200);
});

export default router