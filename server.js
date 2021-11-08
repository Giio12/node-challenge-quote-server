const {
  response
} = require("express");



// server.js
// This is where your node app starts
//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();
//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("<h1>Gio's Quote Server!  Ask me for /quotes/random, or /quotes</h1>");

});
 

//START OF YOUR CODE...
app.get("/quotes", function (request, response) {
  response.send(quotes)
});
app.get("/quotes/random", function (request, response) {
  const randomQuote = pickFromArray(quotes)
  response.send(randomQuote)
});

app.get("/quotes/search",function(request, response){
  const searchTerm = request.query.term.toLowerCase();
  const searchQuotes = quotes.filter((quoteObj)=>{
    const lowerCaseQuote= quoteObj.quote.toLowerCase();
    const lowerCaseAuthor = quoteObj.author.toLocaleLowerCase();
    return lowerCaseQuote.includes(searchTerm)|| lowerCaseAuthor.includes(searchTerm);
  });
  response.send(searchQuotes);
})

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
let port = 5000;

app.listen(port, function () {
  console.log("Your super Gio app is listening on port " + port);
});