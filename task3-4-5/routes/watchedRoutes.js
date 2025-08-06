const express = require('express');

const router = express.Router();

const watched_Ep_Route = require("../controller/watchedEpController");

router.post("/watched", watched_Ep_Route.loggingWatchedEp);
router.get("/watched", watched_Ep_Route.retrievingWatchedEp);
router.put("/watched-episodes/:episodeNumber", watched_Ep_Route.updateWatchedEp);
router.delete("/watched-episodes/:id", watched_Ep_Route.deleteWatchedEp);

module.exports = router;