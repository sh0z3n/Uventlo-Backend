const express = require('express');
const crypto = require('crypto');

const app = express();
const port = 3000;


app.use(express.json());
const apiSecretKey = 'test_sk_ThrFkmgj93zg4F2AL8G06BPS9AAcIXjTKiQgZxDy';


app.post('/webhook', (req, res) => {
    const signature = req.get('signature');

    const payload = JSON.stringify(req.body);

    if (!signature) {
        return res.sendStatus(400);
    }

    const computedSignature = crypto.createHmac('sha256', apiSecretKey)
        .update(payload)
        .digest('hex');

    // if (computedSignature !== signature) {
    //     return res.sendStatus(403);
    // }

    const event = req.body;

    switch (event.type) {
        case 'checkout.paid':
            const checkout = event.data;
            console.log("gg")
            break;
        case 'checkout.failed':
            const failedCheckout = event.data;
            break;
    }

    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
