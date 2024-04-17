import express from 'express';
// import { authMiddleware } from '../middleware/authMiddleware.js';
// import { initiatePayment, handlePaymentCallback, getPaymentStatus } from '../controllers/paymentController.js';
// this route is under development , it may not be implemented in the final version of the app


// @desc Initiate a payment
// @route POST /api/v1/payments
// @access Private
router.post('/payments', authMiddleware, initiatePayment);

// @desc Handle payment callback
// @route POST /api/v1/payments/callback
// @access Public
router.post('/payments/callback', handlePaymentCallback);

// @desc Get payment status
// @route GET /api/v1/payments/:paymentId
// @access Private
router.get('/payments/:paymentId', authMiddleware, getPaymentStatus);