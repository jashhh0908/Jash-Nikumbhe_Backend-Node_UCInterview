const express = require('express');
const router = express.Router();

const siteControllers = require('../controllers/siteControllers');
router.get('/show-details', siteControllers.getShowDetails);
router.get('/episodes', siteControllers.getEpisodes);

module.exports = router;
