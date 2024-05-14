// import express from 'express';
// import crypto from 'crypto';
// import User from '../models/User.mjs';

// const router = express.Router();
// const apiSecretKey = process.env.Chargily_secret_key;

// router.post('/', (req, res) => {
//     const signature = req.get('signature');
//     const payload = JSON.stringify(req.body);
//     if (!signature) {
//         return res.sendStatus(400);
//     }

//     const computedSignature = crypto.createHmac('sha256', apiSecretKey)
//         .update(payload)
//         .digest('hex');

//     if (computedSignature !== signature) {
//         return res.sendStatus(403);
//     }

//     const event = req.body;
//     const checkout = event.data;
//     const userId = checkout.id;  
//     switch (event.type) {
        
//         case 'checkout.paid':
//             User.findByIdAndUpdate(userId, {
//                 lastCheckout: new Date(),
//                 totalCheckouts: { $inc: 1 },
//                 lastCheckoutAmount: checkout.amount
//             }, { new: true })
//             .then(user => {
//                 console.log("User updated with checkout information:", user);
//             })
//             .catch(error => {
//                 console.error("Error updating user with checkout information:", error);
//             });
//             break;

//         case 'checkout.failed':
            
//             User.findByIdAndUpdate(id, {
//                 lastFailedCheckout: new Date(), 
//                 $inc: { totalFailedCheckouts: 1 } 
//             }, { new: true })
//             .then(user => {
//                 console.log("User updated with failed checkout information:", user);
//             })
//             .catch(error => {
//                 console.error("Error updating user with failed checkout information:", error);
//             });
//             break;
//     }

//     res.sendStatus(200);
// });

// export default router;
