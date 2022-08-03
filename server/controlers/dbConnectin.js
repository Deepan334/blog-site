const knex = require('knex');

const db =knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'Deepan334@',
    database : 'postgres'
  }
});

module.exports = db;