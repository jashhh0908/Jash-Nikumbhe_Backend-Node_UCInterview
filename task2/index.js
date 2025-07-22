const express = require('express');
const app = express();
const PORT = 5000;

const siteRoutes = require('./routes/siteRoutes');

app.use(express.json());
app.use('/', siteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

