// paymentController.js
import paypal from 'paypal-rest-sdk';
import Web3 from 'web3';

// Configure PayPal SDK with sandbox credentials
paypal.configure({
  'mode': 'sandbox',
  'client_id': 'AfWJUWPr037zo5CSJizhjKck4hJE5koNkjCi_aOKTobqYoyjSj_fJojRPty8477JuFyVYdqrcdqa-xyp',
  'client_secret': 'EHlVq5S9jOA7Ih82OBqmf4BF5v9APR7lIguNAuixAcdN9-Wt15ccpXvkZ9Ic_qthiqQI_gmgEkjeybNn'
});

// Configure web3 with your Ethereum node provider
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
        "total": "0.01", // Placeholder amount for testing, replace with actual amount
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

// Define function to handle PayPal payment success
export const paypalPaymentSuccess = async (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": "10.00" // Placeholder amount for testing, replace with actual amount
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
 
   // Sample transaction data (modify as needed)
   const fromAddress = "0x86b2151F552417ad6f142B4FD9ad0adf1f6f3337"; // Replace with actual address (optional)
   const toAddress = '0x985DDFbF0E30c7F7eD608D0439C0C3aA2b47604C'; // Replace with actual address (optional)
   const value = '0'; // 1 ETH in Wei
 
   try {
     const tx = {
       from: fromAddress,
       to: toAddress,
       value,
       gas: 10, // Gas limit (adjust as needed)
       gasPrice: '0', // Gas price (adjust as needed)
     };
 
     // Simulate transaction (doesn't actually send anything)
     const simulatedTxHash = await web3.eth.getTransactionReceipt(tx.hash); // Replace with a random hash generation
 
     return simulatedTxHash;
   } catch (error) {
     console.error('Error simulating Ethereum transaction:', error);
     throw error; // Re-throw for handling in calling code
   }
 };