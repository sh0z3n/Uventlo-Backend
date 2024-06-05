// paymentController.js
import paypal from 'paypal-rest-sdk';
import Web3 from 'web3';
dotenv.config({ path: './Api/config/env/.env' });

paypal.configure({
  'mode': 'sandbox',
  'client_id': 'AfWJUWPr037zo5CSJizhjKck4hJE5koNkjCi_aOKTobqYoyjSj_fJojRPty8477JuFyVYdqrcdqa-xyp',
  'client_secret': process.env.paypalSecret
});

const infuraProjectId = 'b6d93a6200c54524a684c370e9189861'; // Infura API Key
const infuraEndpoint = `https://mainnet.infura.io/v3/${infuraProjectId}`;
const web3 = new Web3(infuraEndpoint);

// Define function to create PayPal payment
export const createPaypalPayment = async (req, res) => {
  const payment = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:3000/api/payment/paypal/success",
      "cancel_url": "http://localhost:3000/api/payment/paypal/cancel"
    },
    "transactions": [{
      "amount": {
        "total": "0.01", 
        "currency": "USD"
      },
      "description": "Test payment for uventlo"
    }]
  };

  try {
    paypal.payment.create(payment, (error, payment) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Error creating PayPal payment');
      } else {
        const approvalUrl = payment.links.find(link => link.rel === 'approval_url').href;
        res.status(200).json({ approvalUrl });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating PayPal payment');
  }
};


export const paypalPaymentSuccess = async (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": "10.00" 
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment, (error, payment) => {
    if (error) {
      console.error(error);
      throw error;
    } else {
      console.log(payment);
      res.send('Payment successful');
    }
  });
};


export const createEthereumPayment = async (req, res) => {
   const infuraEndpoint = 'https://mainnet.infura.io/v3/b6d93a6200c54524a684c370e9189861';
   const web3 = new Web3(infuraEndpoint);
 
   const fromAddress = req.body.addrss1;
   const toAddress = req.body.adress2; 
   const value = '0'; 
 
   try {
     const tx = {
       from: fromAddress,
       to: toAddress,
       value,
       gas: 10, 
       gasPrice: '0', 
     };
 
     // Simulate transaction 
     const simulatedTxHash = await web3.eth.getTransactionReceipt(tx.hash); // Replace with a random hash generation
 
     return simulatedTxHash;
   } catch (error) {
     console.error('Error simulating Ethereum transaction:', error);
     throw error; 
   }
 };