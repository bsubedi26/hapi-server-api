
exports.seed = function(knex, Promise) {
    var rows = [

        // You are free to add as many rows as you feel like in this array. Make sure that they're an object containing the following fields:
        {
            name: 'Shreyansh Pandey',
            username: 'labsvisual',
            password: 'password',
            email: 'me@isomr.co',
            guid: 'f03ede7c-b121-4112-bcc7-130a3e87988c',
        },

    ];
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(rows);
    });
};
