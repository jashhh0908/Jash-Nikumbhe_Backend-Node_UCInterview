const episodes = [
{name: "The One with Ross's Tan", season: 10, ep_no: 3, avg_rating: 8.5},
{name: "The One with the Prom Video", season: 2, ep_no: 14, avg_rating: 9.6},
{name: "The Last One, Part 2", season: 10, ep_no: 18, avg_rating: 9.6},
{name:"The One Where Everybody Finds Out", season: 5, ep_no: 14, avg_rating: 9.5}
];


function sorting(episodes){
  sortedEpisodes = episodes.sort(function(a, b){
    if(a.avg_rating != b.avg_rating){
      return b.avg_rating - a.avg_rating; // b-a since we have to do in descending order 
    }
    else if(a.avg_rating == b.avg_rating){
      if(a.season != b.season){
        return b.season - a.season;
      }
      else if(a.season == b.season){
        if(a.ep_no != b.ep_no)
          return b.ep_no - a.ep_no;
        else
          return;
      }
    }
  })
}

sorting(episodes);

for(const i of episodes){
  console.log("Name: " + i.name + " Season: " + i.season + " Episode Number: " + i.ep_no + " Rating: " + i.avg_rating); //printing the array of episodes
} 

//explanation -
// 1) initializing the episodes array of objects
// 2) create a sorting function to sort the episodes
// 3) since sort() sorts the elements alphabetically, we use a callback function which takes the first 2 objects' values and compares their corresponding values
// 4) the sorting logic is such that if the difference is positive we swap, else keep them as is 
// 5) after sorting we print the array using for of loop.

