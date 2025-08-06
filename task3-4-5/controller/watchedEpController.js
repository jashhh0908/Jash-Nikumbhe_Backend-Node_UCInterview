const axios = require('axios');

const episodeModel = require('../model/watchedEpModel');

async function loggingWatchedEp(req, res) {
  try{
    const { id, title, season, episodeNumber, userReview, watchedAt } = req.body;
    const addWatchedEp = await episodeModel.create({
      title,
      season,
      episodeNumber,
      userReview,
      watchedAt,
    });
    return res.status(201).json({ message: "Watched episode logged successfully" });
  } catch (error) {
    res.status(500).json({ error: "Database error!"});
  }
};

async function retrievingWatchedEp(req, res){
  try{
    const watchedEps = await episodeModel.find();
    const sorted =  watchedEps.sort((a,b) => ( new Date(b.watchedAt) - new Date(a.watchedAt))); // new Date to convert string to a Date object
    console.log("retrieving watched called")
    res.status(200).json(sorted);
  } catch (error) {
    console.error("error: ", error);
    res.status(500).json({ error: "Database error!"});
  }
} 

async function updateWatchedEp(req, res){
  try{
    const episode_number = req.params.episodeNumber;
    const update = await episodeModel.findOneAndUpdate(
      { episodeNumber: episode_number }, 
      { watchedAt: new Date() }, // creating a new object with current date and time
      { new: true, overwrite: true}
    )
    if(!update)
      return res.status(404).json({ message: "Episode not updated" });
    else
      return res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ error: "Database error!"});
  }
};

async function deleteWatchedEp(req, res){
  try{
    const deletedEp = await episodeModel.findByIdAndDelete(
      req.params.id
    )
    if(!deletedEp)
      return res.status(404).json({ message: "Episode not deleted" });
    else
      return res.status(200).json({ message: "Episode successfully deleted"});
    } catch (error) {
      console.error("error: ", error);
      res.status(500).json({ error: "Database error!"});
    }
};

module.exports = {
  loggingWatchedEp,
  retrievingWatchedEp,
  updateWatchedEp,
  deleteWatchedEp
}
