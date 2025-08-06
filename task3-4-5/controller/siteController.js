const axios = require('axios');

const episodeModel = require('../model/episodeModel');

//task 3
//to fetch the data from API and add to the database
async function seeding(req, res){
  try{
    const response = await axios.get("https://api.tvmaze.com/shows/431/episodes");
    const data = response.data;
    const newData = data.map((ep) => ({
      id: ep.id,
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
    const APIid = req.params.id;
    const episodebyID = await episodeModel.findOne({
      id: APIid
    });
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

//task 4
//to edit all details of an epsiode
async function editEpisodeFull(req, res){
  try{
    const APIid = req.params.id;
    const EpData = req.body;
    const updateEp = await episodeModel.findOneAndUpdate(
      { id: APIid },
      EpData,
      { new: true, overwrite: true} // returns updated document, and overwrite the existing one 
    );
    if(!updateEp)
      return res.status(404).json({ message: "Episode not updated" });
    else
      return res.status(200).json(updateEp);
    } catch (error) {
      console.error("error: ", error);
      res.status(500).json({ error: "Database error!"});
    }
}

//to edit summary field of episode 
async function editEpisodeSpecific(req, res) {
  try{
    const APIid = req.params.id;
    const updatedEp = await episodeModel.findOneAndUpdate(
      {id: APIid},
      { $set: {
        name: req.body.name,
        season: req.body.season,
        number: req.body.number,
        airdate: req.body.airdate,
        summary: req.body.summary
      }}, //$set allows to set specific mentioned fields 
      { new: true } // return updated document 
    );
    if(!updatedEp)
      return res.status(404).json({ message: "Episode not updated" });
    else
      return res.status(200).json(updatedEp);
    } catch (error) {
      res.status(500).json({ error: "Database error!"});
    }
}

//to deleted specific episode by ID
async function deleteEpisode(req, res) {
  try{
    const deletedEp = await episodeModel.findOneAndDelete({
      id: req.params.id,
    });
    if(!deletedEp)
      return res.status(404).json({ message: "Episode not deleted" });
    else
      return res.status(200).json({ message: "Episode successfully deleted"});
    } catch (error) {
      res.status(500).json({ error: "Database error!"});
    }
}
module.exports = {
  seeding,
  postEpisode,
  getEpisode,
  getEpisodeById,
  getSeason,
  getEpisodeBySeason,
  editEpisodeFull,
  editEpisodeSpecific,
  deleteEpisode
};

