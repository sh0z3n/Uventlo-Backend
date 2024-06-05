// config/database.mjs
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));


// dotenv.config({ path: path.resolve(__dirname, 'env', '.env') });
dotenv.config();
const uri = process.env.MONGODB_URI;
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
