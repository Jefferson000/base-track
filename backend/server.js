const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
// const rateLimiter = require('./middleware/rateLimiter');
const cookieParser = require('cookie-parser');
const errorHandler = require('./lib/errorHandler');

// Import route files for each entity
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');

// Load environment variables
dotenv.config();

// Create the Express app
const app = express();

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://base-track-web.onrender.com',
    'https://basetrack.com'
  ],
  credentials: true
};

// Middleware setup
app.use(morgan('dev'));
app.use(express.json());
// app.use(rateLimiter);
app.use(cors(corsOptions));
app.use(cookieParser());

// Register all routes
app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);

// Error handler middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.NODE_ENV == "development" ? 9000 : process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
