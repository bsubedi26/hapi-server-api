const Knex = require('knex');
const knexConfig = require('../../knexfile');
const { Model } = require('objection');

// Initialize knex.
const knex = Knex(knexConfig.development);

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knex);
