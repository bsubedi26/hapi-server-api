import knex from 'knex';

// knex instance to use in routes/controllers/services
export default knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'react_db',
    charset: 'utf8',
  }
});