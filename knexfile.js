// var knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host : '127.0.0.1',
//     user : 'your_database_user',
//     password : 'your_database_password',
//     database : 'myapp_test'
//   }
// });


module.exports = {

    development: {

        migrations: { tableName: 'knex_migrations' },
        seeds: { tableName: './seeds' },

        client: 'mysql',
        connection: {
            host: 'localhost',
            // host: '192.168.33.10',
            user: 'root',
            password: 'root',

            database: 'react_db',
            charset: 'utf8',

        }

    }

};