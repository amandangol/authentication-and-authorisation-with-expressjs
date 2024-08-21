"use strict";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT | 4001;
app.use(morgan("tiny"));

const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Your frontend origin
    credentials: true, // Allows credentials (cookies, etc.)
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE', // Allow specific methods
    allowedHeaders: [
      'X-Requested-With',
      'Content-Type',
      'Authorization',
      'Authentication',
      'withCredentials',
      'x-access-token',
      'Origin',
      'Accept'
    ], // Allow specific headers
    optionsSuccessStatus: 200 // Some browsers choke on 204
  };
  
  app.use(cors(corsOptions));
  
app.use(cors(corsOptions));

app.use(cookieParser(process.env.TOKEN_KEY));

var jsonParser = bodyParser.json();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.options('*', cors(corsOptions)); // Handle preflight requests for all routes

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Content-Type, Authorization,Authentication,withCredentials, Content-Length, X-Requested-With, Accept, x-access-token,credentials, Origin, X-Content-Type-Options"
  );
  res.header(
    "Access-Control-Expose-Headers",
    "x-access-token, Authorization, Authentication, withCredentials, credentials, Set-Cookie"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// App Routes
app.use("/auth", require("./routes/authHandling"));
app.use("/admin", require("./routes/adminHandling"));

var server = app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
});