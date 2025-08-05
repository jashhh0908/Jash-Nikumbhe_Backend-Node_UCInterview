const express = require('express');
const router = express.Router();

const siteControllers = require('../controller/siteController');

router.post("/episodes/seeding", siteControllers.seeding);
router.post("/episodes", siteControllers.postEpisode);
router.get("/episodes", siteControllers.getEpisode);
router.get("/episodes/:id", siteControllers.getEpisodeById);
router.get("/seasons/:seasonNumber/episodes", siteControllers.getSeason);
router.get("/seasons/:seasonNumber/episodes/:episodeNumber", siteControllers.getEpisodeBySeason);

module.exports = router;
