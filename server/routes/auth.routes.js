import auth from '../controllers/auth.controller';

export default [
	{method: 'POST', path: '/login', config: auth.login},
	{method: ['GET', 'POST'], path: '/logout', config: auth.logout}
];