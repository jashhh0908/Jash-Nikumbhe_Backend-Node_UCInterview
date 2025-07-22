const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question("Enter your name: ", function(name){
  const promise = new Promise((resolve, reject) => {
    if(name.length >= 4){
      resolve(name);
    }
    else{
      reject("Name too short");
    }
  })
  promise
    .then(name => { 
      let str = name.slice(0,4);
      const surnames = ['Geller', 'Tribbiani', 'Buffay', 'Green', 'Bing', 'Wheeler', 'Hannigan'];

      const index = Math.floor(Math.random() * surnames.length);
      const randomSurname = surnames[index];

      console.log("Output: " + str + " " + randomSurname);
    })
    .catch(error => { console.log("Error: " + error)});
    rl.close();
})

//explanation - 
// 1) so i import the readline module from node then i create an object called 'rl' which works like the sc in Scanner sc in java, i specify the input as standard keyboard and output as standard terminal
// 2) I use question to take the name input from user 
// 3) I create a promise object to handle the error if the name is lesser than 4 letters
// 4) in my promise object i use then to execute the resolve function of promise, where i take the first 4 letters of the enetered name using slice, then take a random Index using math operations and combine them
// 5) if the name entered is shorter than 4, then the reject function executes and calls the catch function where the error gets printed  
// 6) rl is closed later at the end of the program