'use strict';

const { DATABASE } = require('./config');
const knex = require('knex')(DATABASE);

// clear the console before each run
process.stdout.write('\x1Bc');

// Sample select 
// knex
//   .select()
//   .from('restaurants')
//   .limit(2)
//   .debug(true)
//   .then(results => console.log(results));
knex('grades')
  .where('id', 10)
  .del()
  .then(results => console.log(JSON.stringify(results, null, 4)))
  .catch( err => console.log( err ));


// Destroy the connection pool
knex.destroy().then(() => {
  console.log('database connection closed');
});