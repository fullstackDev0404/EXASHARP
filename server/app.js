const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
// const port = 3000;

app.use(cors()); // Enable CORS for all routes

app.get('/api/data', (req, res) => {
  res.json({ message: "Hello from the Express Backend!", status: "Connected" });
});


if (process.env.NODE_ENV !== 'production') {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Development server running at http://localhost:${port}`);
  });
}

module.exports = app;