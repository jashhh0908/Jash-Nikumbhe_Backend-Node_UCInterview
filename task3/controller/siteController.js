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

/*const axios = require('axios');
const TvEpisodeModel = require('../models/TvEpisodeModel');

const getAllEpisodes = async (req, res) => {
  try {
    const episodes = await TvEpisodeModel.find();
    res.status(200).json(episodes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch episodes' });
  }
};

const getEpisodeById = async (req, res) => {
  try {
    const episode = await TvEpisodeModel.findById(req.params.id);
    if (!episode) {
      return res.status(404).json({ error: 'Episode not found' });
    }
    res.status(200).json(episode);
  } catch (err) {
    res.status(400).json({ error: 'Invalid episode ID' });
  }
};

const addEpisode = async (req, res) => {
  try {
    const newEpisode = new TvEpisodeModel(req.body);
    await newEpisode.save();
    res.status(201).json(newEpisode);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add episode' });
  }
};

const seedEpisodesFromAPI = async (req, res) => {
  try {
    const response = await axios.get('https://api.tvmaze.com/shows/431/episodes');
    const episodes = response.data;
    await TvEpisodeModel.deleteMany({});
    await TvEpisodeModel.insertMany(episodes);
    res.status(201).json({
      message: 'Episodes seeded successfully!',
      count: episodes.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to seed episodes', details: error.message });
  }
};

module.exports = {
  getAllEpisodes,
  getEpisodeById,
  addEpisode,
  seedEpisodesFromAPI
};
*/