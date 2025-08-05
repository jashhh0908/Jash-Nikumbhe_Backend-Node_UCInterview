const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const siteRoutes = require('./routes/siteRoutes');

const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(express.json());
app.use('/api', siteRoutes);

mongoose.connect(process.env.mongo_uri)
.then(() => {
  console.log('MongoDB Connected');
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
  })
  .catch((error) => { console.log ("Connection error!") });
