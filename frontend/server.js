const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const flash = require('connect-flash');
const session = require('express-session');
const url = require('url');
// Load env vars
dotenv.config({ path: './config/config.env' });

// Frontend Route files


// initialising the app
const app = express();

// EJS
app.set('view engine', 'ejs');


// Cookie parser
app.use(cookieParser());


// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
    })
  );
// Connect flash
app.use(flash());

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


// controllers
app.get('/', (req, res) => res.send('hello'));

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  // server.close(() => process.exit(1));
});