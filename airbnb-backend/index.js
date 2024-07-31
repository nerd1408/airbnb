const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

// Import routes, middleware, and other necessary files
const authRoutes = require('./routes/auth.routes');
const listingRoutes = require('./routes/listing.routes');
const tenantListingRoutes = require('./routes/tenantListingRoutes.routes');
const errorHandler = require('./middlewares/error-handler');

// Initialize Express app
const app = express();

const corsOptions = {
  origin: ['http://127.0.0.1:4200', 'http://localhost:4200']
}
app.use(cors(corsOptions))

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/listing', listingRoutes);
app.use('/api/tenant-listing', tenantListingRoutes)

// MongoDB Connection
const mongoURI = 'mongodb+srv://roeman:roeman@cluster0.nxiaxib.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';  
mongoose.connect(mongoURI)
.then(() => {
  console.log('Connected to MongoDB');
  // Start the server once MongoDB is connected
  app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
  });
})
.catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Error handler middleware
app.use(errorHandler);

// Export the app (if needed)
module.exports = app;
