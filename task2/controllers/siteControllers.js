const axios = require('axios');

async function getShowDetails(req, res){
  try{
    const url = await axios.get("https://api.tvmaze.com/singlesearch/shows?q=friends"); //making an API request to the server 
    const data = url.data; //extracting the full data
    const showDetails = {
      id: data.id,
      name: data.name,
      lang: data.language,
      genre: data.genres,
      status: data.status,
      summ: data.summary
    }; //extracting only what is useful from the previous extrtacted data
    res.json(showDetails);//sending a response from the api to the client 
  }
  catch (error){
    res.status(500).json({error:"something"}); //error message
  }
};

async function getEpisodes(req, res){
  try{
    const url = await axios.get("https://api.tvmaze.com/shows/431/episodes");
    const episode_data = url.data;
    const data = episode_data.map(ep => ({
      id: ep.id,
      name: ep.name,
      season: ep.season,
      num: ep.number,
      rating: ep.rating
    }));
    res.json(data);
  }
  catch (error){
    res.status(500).json({ error: "Something went wrong!" });
  }
    
};

module.exports = {
  getEpisodes,
  getShowDetails
};
