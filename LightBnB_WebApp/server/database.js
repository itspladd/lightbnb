const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  database: 'lightbnb',
  host: 'localhost'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString = `SELECT *
  FROM users
  WHERE email = $1`;
  const values = [email.toLowerCase()]; 
  return pool.query(queryString, values)
  .then(res => res.rows[0]) // res.rows is an array, but login functions expect a single object.
  .catch(err => console.error(err));
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `SELECT *
    FROM users
    WHERE id = $1`;
  const values = [id]; 
  return pool.query(queryString, values)
  .then(res => res.rows[0])
  .catch(err => console.error(err));
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryString = `INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *`;
  const values = [user.name, user.email, user.password];
  return pool.query(queryString, values)
  .then(res => res.rows[0])
  .catch(err => console.error(err));
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `SELECT res.*, prop.*, AVG(revs.rating) AS average_rating
  FROM reservations AS res
  JOIN properties AS prop ON res.property_id = prop.id
  JOIN property_reviews AS revs ON revs.property_id = prop.id
  WHERE res.guest_id = $1
  GROUP BY res.id, prop.id
  ORDER BY res.start_date DESC
  LIMIT $2;`
  const values = [guest_id, limit]
  return pool.query(queryString, values)
  .then(res => res.rows)
  .catch(err => console.error(err));
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryString = `SELECT *
    FROM properties
    LIMIT $1`;
  return pool.query(queryString, [limit])
  .then(res => res.rows)
  .catch(err => console.error(err));
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
