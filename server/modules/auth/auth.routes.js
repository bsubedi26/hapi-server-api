'use strict';

const Joi = require('joi');

import authController from './auth.controller';

export default [
  {
    method: 'POST',
    path: '/api/auth/login',
    config: authController.login
  },
  {
    method: 'POST',
    path: '/api/auth/logout',
    config: userController.logout
  }
]