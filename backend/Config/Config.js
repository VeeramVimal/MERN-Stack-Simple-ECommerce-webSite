
const dotenv = require('dotenv')

dotenv.config({path: `./env./env.${process.env.NODE_ENV}`});

// var EnvName = process.env.EnvName;
// console.log('EnvName', EnvName);


module.exports = {

  PORT: process.env.PORT || 8000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/User_Register',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
//   PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
//   accessKeyId: process.env.accessKeyId || 'accessKeyId',
//   secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
};
