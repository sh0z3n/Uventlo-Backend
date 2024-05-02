// config/database.mjs
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the directory path of the current file
const __dirname = dirname(fileURLToPath(import.meta.url));


dotenv.config({ path: path.resolve(__dirname, 'env', '.env') });

// Retrieve MongoDB connection URI from environment variables
const uri = process.env.MONGODB_URI;
// Connect to MongoDB
mongoose.connect(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  // poolSize : 20,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

export default mongoose.connection;
