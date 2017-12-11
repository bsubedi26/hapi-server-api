
exports.up = function (knex, Promise) {
  const table = 'user';

  return knex.schema.hasTable(table).then(exists => {
      if (!exists) {
        knex.schema
        .createTable(table, t => {
          t.increments('id').primary();

          
          t.string('email').unique().notNullable();
          t.string('password').notNullable();
          // t.timestamp('created_at').notNullable();
          t.timestamps(true, true);
          // t.boolean('isVerified');
          // t.string('verifyToken');
          // t.string('verifyShortToken');

          // t.json('verifyChanges');
          // t.string('verifyExpires');
        })
          .then(() => console.log(`Created ${table} table`))
          .catch((e) => console.log(e));
      }
  });

};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
