// A single centralized function that all database queries are routed through.
// databaseFunctions.js builds on this file to make its queries.
// The idea is that any debugging or logging we need to do can be done here,
// in one place.

const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  database: 'lightbnb',
  host: 'localhost'
});

module.exports = {
  query: (text, params) => {
    return pool.query(text, params)
    .then(res => res.rows)
    .catch(err => console.error(err));
  }
}