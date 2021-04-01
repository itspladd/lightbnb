const properties = require('./json/properties.json');
const users = require('./json/users.json');

const db = require('./db');

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
  const queryParams = [email.toLowerCase()]; 
  return db.query(queryString, queryParams)
  .then(rows => {
    if (rows.length === 0) {
      return null;
    }
    return rows[0]; // res.rows is an array, but login functions expect a single object.
  }) 
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
  const queryParams = [id]; 
  return db.query(queryString, queryParams)
  .then(rows => rows[0])
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
  const queryParams = [user.name, user.email, user.password];
  return db.query(queryString, queryParams)
  .then(rows => rows[0])
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
  const queryParams = [guest_id, limit]
  return db.query(queryString, queryParams)
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
  // Define a helper function to build the correct query string
  // DOES NOT MODIFY THE INPUT ARRAY OR INPUT STRING
  /*****************************************/
  const buildWhereQuery = (queryString, paramsArray) => {
    let resultString = '';
    if (paramsArray.length === 0) {
      resultString = 'WHERE ' + queryString;
    } else {
      resultString = 'AND ' + queryString;
    }
    // Add the $1, $2, whichever it should be, plus the newline
    resultString += ` $${paramsArray.length + 1}
    `;
    return resultString;
  };
  /******************************************/

  let queryString = `SELECT properties.*, avg(revs.rating) as average_rating
    FROM properties
    LEFT OUTER JOIN property_reviews AS revs ON properties.id = revs.property_id
    `;
  const queryParams = [];

  // Get all of our parameters from the options
  const { city,
    owner_id,
    minimum_price_per_night,
    maximum_price_per_night,
    minimum_rating
  } = options;

  if (city) {
    queryString += buildWhereQuery('properties.city LIKE', queryParams);
    queryParams.push(`%${city}%`);
  }
  if (owner_id) {
    queryString += buildWhereQuery('properties.owner_id =', queryParams);
    queryParams.push(`${owner_id}`);
  }
  if (minimum_price_per_night) {
    queryString += buildWhereQuery('properties.cost_per_night/100 >=', queryParams);
    queryParams.push(`${minimum_price_per_night}`);
  }
  if (maximum_price_per_night) {
    queryString += buildWhereQuery('properties.cost_per_night/100 <=', queryParams);
    queryParams.push(`${maximum_price_per_night}`);
  }

  queryString += `GROUP BY properties.id
  `;
  if (minimum_rating) {
    queryParams.push(`${minimum_rating}`);
    queryString += `HAVING avg(revs.rating) >= $${queryParams.length}
    `;
  }

  queryParams.push(limit);
  queryString += `ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  return db.query(queryString, queryParams)
  .catch(err => console.error(err));
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  // Since all the keys have the same names as our database columns, we can just get the keys
  const propertyKeysArray = Object.keys(property);
  const numValues = propertyKeysArray.length;

  // Since the values are what we want in our query parameters, we can just get the values
  const queryParams = Object.values(property);

  // Turn the keys array into a string of column names
  const propertiesString = propertyKeysArray.join(', ');

  // Make a $1, $2, etc string from the number of values
  let valuesString = '';
  for(let i = 1; i <= numValues; i++) {
    valuesString += i !== 1 ? ', ' : ''; 
    valuesString += `$${i}`;
  }

  const queryString = `INSERT INTO properties (${propertiesString})
  VALUES (${valuesString})
  RETURNING *`;
  return db.query(queryString, queryParams)
  .catch(err => console.error(err));
}
exports.addProperty = addProperty;
