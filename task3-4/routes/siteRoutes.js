const express = require('express');
const router = express.Router();

const siteControllers = require('../controller/siteController');

//task 3 routes
router.post("/episodes/seeding", siteControllers.seeding);
router.post("/episodes", siteControllers.postEpisode);
router.get("/episodes", siteControllers.getEpisode);
router.get("/episodes/:id", siteControllers.getEpisodeById);
router.get("/seasons/:seasonNumber/episodes", siteControllers.getSeason);
router.get("/seasons/:seasonNumber/episodes/:episodeNumber", siteControllers.getEpisodeBySeason);

//task 4 routes
router.put("/episodes/:id", siteControllers.editEpisodeFull);
router.patch("/episodes/:id", siteControllers.editEpisodeSpecific);
router.delete("/episodes/:id", siteControllers.deleteEpisode);
module.exports = router;
