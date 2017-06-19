import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bluebird from 'bluebird';

import socket from './server/socket'
import config from './server/config';
import errorHandler from './server/middlewares/errorHandler';
import authRoute from './server/routes/auth';
import userRoute from './server/routes/user';
import chatRoute from './server/routes/chat';
import getUser from './server/middlewares/getUser';
import checkToken from './server/middlewares/checkToken';

const app = express();

mongoose.Promise = bluebird;
mongoose.connect(config.database, err => {
  if (err)
    throw err;

  console.log(`mongoose connected`)
})

const server = app.listen(config.port, err => {
  if (err)
    throw err;

  console.log(`port ${config.port}`)
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});

app.use(session({resave: true, saveUninitialized: true, secret: config.secret}));

app.use('/api', authRoute);
app.use('/api', checkToken, userRoute);
app.use('/chats', checkToken, chatRoute);
app.use(getUser);

app.use(errorHandler);

//app.get('*', (req, res) => {
//  res.sendFile('public/index.html', {root: __dirname});
//})

socket(server)
