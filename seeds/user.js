
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {email: 'ssss@ss.com', password: 'rowValue1'},
        {email: 'sssxxxx@xx.com', password: 'rowValue2'},
        {email: 'ddddd@dd.com', password: 'rowValue3'}
      ]);
    });
};
