const axios = require('axios');

const episodeModel = require('../model/episodeModel');

//to fetch the data from API and add to the database
async function seeding(req, res){
  try{
    const response = await axios.get("https://api.tvmaze.com/shows/431/episodes");
    const data = response.data;
    const newData = data.map((ep) => ({
      name: ep.name,
      season: ep.season,
      number: ep.number,
      airdate: ep.airdate,
      summary: ep.summary
    }));
    
    await episodeModel.deleteMany({}); //deleting all data so that duplicates are not created
    await episodeModel.insertMany(newData); //inserting the API data to DB
    res.status(201).json({ message: "Episodes saved succesfully to database" });
  } catch (error) {
    res.status(500).json({ error: "Unsuccesful!" });
  }
};

//to add an episode to DB
async function postEpisode(req, res){
  try{
    const newEp = await episodeModel.create(req.body);
    res.status(201).json(newEp);
  } catch (error) {
    res.status(500).json({ error: "Failed to add episode" });
  }
};

//to get all eps from API
async function getEpisode(req, res) {
  try{
    const data = await episodeModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to get episodes!" });
  }
};

//to get specific ep by ID
async function getEpisodeById(req, res){
  try{
    const id = req.params.id;
    const episodebyID = await episodeModel.findById(id);
    if(!episodebyID)
      return res.status(404).json({ message: "Episode not found" });
    else
      return res.status(200).json({ 
        message: "Episode found",
        episode: episodebyID
      })
  } catch (error) {
    res.status(500).json({ error: "Database error!" });
  }
};

//to get all eps of a specific season
async function getSeason(req,res){
  try{
    const Season = req.params.seasonNumber;
    const episodeList = await episodeModel.find({
      season: Season
    });
    if(!episodeList)
      return res.status(404).json({ message: "Episodes of that season not found" });
    else
      return res.status(200).json(episodeList);
  } catch(error){
    res.status(500).json({ error: "Database error!"});
  }
};

//to get specific episode of a specific season 
async function getEpisodeBySeason(req, res){
  try{
    const Season = req.params.seasonNumber;
    const Ep = req.params.episodeNumber;
    const foundEp = await episodeModel.findOne({
      season: Season,
      number: Ep
    });
    if(!foundEp)
      return res.status(404).json({ message: "Episode not found" });
    else
      return res.status(200).json(foundEp);
    } catch(error){
    res.status(500).json({ error: "Database error!"});
  }
};

module.exports = {
  seeding,
  postEpisode,
  getEpisode,
  getEpisodeById,
  getSeason,
  getEpisodeBySeason
};