const pool = require('./db');

pool.query(`
  CREATE TABLE IF NOT EXISTS daily_intake (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    calories INT DEFAULT 0,
    protein INT DEFAULT 0,
    carbs INT DEFAULT 0,
    fats INT DEFAULT 0,
    intake_date DATE DEFAULT CURRENT_DATE
  );
`, (err, result) => {
  if (err) {
    console.error('Error creating daily intake table:', err);
  } else {
    console.log('Daily intake table created successfully');
  }
  pool.end(); // Close the connection pool
});