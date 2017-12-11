module.exports = {
  development: {
    migrations: { tableName: 'knex_migrations' },
    seeds: { tableName: './seeds' },
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './sqlite3.db'
    }
  },

  production: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './sqlite3.db'
    }
  }
};


