const User = require('./controller/user.controller')

exports.endpoints = [
  { method: 'GET', path: '/user', config: User.get },
  { method: 'POST', path: '/user', config: User.create },
  { method: 'POST', path: '/login', config: User.login },
  // { method: 'POST', path: '/forgotPassword', config: User.forgotPassword },
  // { method: 'POST', path: '/verifyEmail', config: User.verifyEmail },
  // { method: 'POST', path: '/resendVerificationEmail', config: User.resendVerificationEmail }

];