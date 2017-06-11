import jwt from 'jsonwebtoken';
import moment from 'moment'

import User from '../models/user';
import config from '../config';

const createToken = (login, admin, _id) => {
  let payload = {
    _id: _id,
    sub: login,
    admin: admin,
    exp: moment().add(1, 'day').unix()
  };
  return jwt.sign(payload, config.secret);
}

export const signup = async(req, res, next) => {
  const credentials = req.body;
  let user;
  try {
    user = await User.create(credentials);
  } catch ({message}) {
    return next({status: 400, message});
  }

  res.json(user);
}

export const signin = async(req, res, next) => {
  const {login, password} = req.body;

  const user = await User.findOne({login});

  if (!user) {
    return next({status: 400, message: 'User not found'});
  }

  try {
    const result = await user.comparePasswords(password);
  } catch (e) {
    return next({status: 400, message: 'Bad Credentials'});
  }
  res.json(createToken(login, user.admin, user._id));
}
