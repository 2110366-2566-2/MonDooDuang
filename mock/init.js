// init.js

// Connect to the database
db = db.getSiblingDB("mondooduang_db");

// Insert mock data into a collection
db.example.insertMany([
  { name: "John Doe", email: "john@example.com", age: 30 },
  { name: "Alice Smith", email: "alice@example.com", age: 25 },
  // Add more mock users as needed
]);
