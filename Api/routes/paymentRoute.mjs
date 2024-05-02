import express from 'express';
import { createPaypalPayment, paypalPaymentSuccess, createEthereumPayment } from '../controllers/paymentController.mjs';

const router = express.Router();

router.post('/paypal/create', createPaypalPayment);
router.get('/paypal/success', paypalPaymentSuccess);
router.get('/paypal/cancel', (req, res) => {
  res.send('Payment cancelled');
});
router.post('/ethereum/create', createEthereumPayment);

export default router;
