const mysql = require("mysql2/promise");

// Create a pool instead of a single connection (better for web apps)
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "job_application",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection immediately
pool.getConnection()
  .then(conn => {
    console.log("Connected to the MySQL database.");
    conn.release(); // Return it to the pool
  })
  .catch(err => {
    console.error("Error connecting to the database:", err.message);
  });

module.exports = pool;
