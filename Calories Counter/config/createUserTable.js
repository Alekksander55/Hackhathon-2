const pool = require('./db.js');

pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  );
`, (err, result) => {
  if (err) {
    console.error('Error creating user table:', err);
  } else {
    console.log('User table created successfully');
  }
  pool.end(); // Close the connection pool
});