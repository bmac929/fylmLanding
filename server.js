import admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Add error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// --- Initialize the Admin SDK ---
let db = null;
try {
  const serviceAccount = JSON.parse(
      process.env.FIREBASE_CONFIG
    );

  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  db = admin.firestore();
  console.log('Firebase Admin SDK initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error);
  // Continue without Firebase if it's not configured
}
// --- End Admin SDK Initialization ---

const app = express();

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Express error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Allow requests from different origins (adjust options for production)

// reCAPTCHA verification function
async function verifyRecaptcha(token) {
  try {
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: token
      }
    });
    
    return response.data.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

// --- Define the API endpoint to receive data from the frontend ---
app.post('/film', async (req, res) => {
  console.log('hit back end!!!!');
  try {
    if (!db) {
      return res.status(500).send({ message: 'Database not initialized' });
    }

    // Get the data sent from the frontend from the request body
    const { link, linkPassword, rating, duration, submitter, subtitlesPassword, subtitles, title, trailer, trailerPassword, warning, productionYear, art, genre, description, cast, awards, payment, id, recaptchaToken } = req.body;

    // Verify reCAPTCHA token (temporarily disabled for testing)
    // if (!recaptchaToken) {
    //   return res.status(400).send({ message: 'reCAPTCHA token is required' });
    // }

    // const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    // if (!isRecaptchaValid) {
    //   return res.status(400).send({ message: 'reCAPTCHA verification failed' });
    // }

    // console.log('reCAPTCHA verification successful');

    // Basic validation (add more robust validation as needed)
    

    // Use the Admin SDK to write to Firestore
    const collectionRef = db.collection('filmsub'); // Or your preferred collection
    const docRef = await collectionRef.add({
      title: title,
      link: link,
      linkPassword: linkPassword,
      rating: rating,
      runtime: duration,
      submitter: submitter,
      subtitlePassword: subtitlesPassword,
      subtitles: subtitles,
      trailer: trailer,
      trailerPassword: trailerPassword,
      warning: warning,
      year: productionYear,
      image: art,
      genre: genre,
      description: description,
      awards: awards,
      cast: cast,
      payment: payment,
      id: id,
      recaptchaVerified: true,
      submittedAt: admin.firestore.FieldValue.serverTimestamp(),
      // Add other fields if necessary, maybe user ID if authenticated
    });

    console.log('Document written with ID:', docRef.id);

    // Send a success response back to the frontend
    res.status(201).send({ message: 'Item added successfully', id: docRef.id });

  } catch (error) {
    console.error('Error adding document from server endpoint:', error);
    // Send an error response back to the frontend
    res.status(500).send({ message: 'Error adding item', error: error.message });
  }
});

app.post('/users', async (req, res) => {
  console.log('hit users back end!!!!');
  try {
    if (!db) {
      return res.status(500).send({ message: 'Database not initialized' });
    }

    const { name, email, role } = req.body;
    console.log('Received data:', { name, email, role });

    // Add your logic here to save the data to your database
    // For example, you might want to save it to a collection in Firestore
    const userRef = db.collection('users');

    const docRef = await userRef.add({
      name: name,
      email: email,
      role: role
    });
  
    console.log('Document written with ID:', docRef.id);

    // Send a success response back to the frontend
    res.status(201).send({ message: 'Item added successfully', id: docRef.id });

  } catch (error) {
    console.error('Error adding document from server endpoint:', error);
    // Send an error response back to the frontend
    res.status(500).send({ message: 'Error adding item', error: error.message });
  }
});

app.post('/genre', async (req, res) => {
  console.log('hit genre back end!!!!');
  try {
    if (!db) {
      return res.status(500).send({ message: 'Database not initialized' });
    }

    const { email, friendEmail, genre } = req.body;
    console.log('Received data:', { email, friendEmail, genre });

    // Add your logic here to save the data to your database
    // For example, you might want to save it to a collection in Firestore
    const userRef = db.collection('genre');

    const docRef = await userRef.add({
      email: email,
      friend: friendEmail,
      genre: genre
    });
  
    console.log('Document written with ID:', docRef.id);

    // Send a success response back to the frontend
    res.status(201).send({ message: 'Item added successfully', id: docRef.id });

  } catch (error) {
    console.error('Error adding document from server endpoint:', error);
    // Send an error response back to the frontend
    res.status(500).send({ message: 'Error adding item', error: error.message });
  }
});

// Serve static files from the dist directory
const distPath = join(__dirname, 'dist');
if (existsSync(distPath)) {
  app.use(express.static(distPath));
  console.log('Static files will be served from:', distPath);
} else {
  console.warn('Dist directory not found:', distPath);
}

// Handle all other routes by serving the index.html file
app.get('*', (req, res) => {
  console.log('Serving index.html for route:', req.path);
  const indexPath = join(__dirname, 'dist', 'index.html');
  
  if (existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error('index.html not found at:', indexPath);
    res.status(404).send('Application not built. Please run npm run build first.');
  }
});

// --- Start the server ---
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Node version: ${process.version}`);
});

