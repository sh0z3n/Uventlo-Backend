
const express = require('express');
const crypto = require('crypto');

const app = express();
const port = 3000;

// Your Chargily Pay Secret key, will be used to calculate the Signature
const apiSecretKey = 'test_sk_sxZuGGVKSAF2Xa5FfzVgpq7hAR8cqfZDNk8vhqfI';

app.use(express.json());

app.post('/webhook', (req, res) => {
    // Extracting the 'signature' header from the HTTP request
    const signature = req.get('signature');

    // Getting the raw payload from the request body
    const payload = JSON.stringify(req.body);

    // If there is no signature, ignore the request
    if (!signature) {
        return res.sendStatus(400);
    }

    // Calculate the signature
    const computedSignature = crypto.createHmac('sha256', apiSecretKey)
        .update(payload)
        .digest('hex');

    if (computedSignature !== signature) {
        return res.sendStatus(403);
    }

    // If the signatures match, proceed to decode the JSON payload
    const event = req.body;

    // Switch based on the event type
    switch (event.type) {
        case 'checkout.paid':
            const checkout = event.data;
            // Handle the successful payment.
            break;
        case 'checkout.failed':
            const failedCheckout = event.data;
            // Handle the failed payment.
            break;
    }

    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
