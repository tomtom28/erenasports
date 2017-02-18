// Node Dependencies
var express = require('express');


// Set up Express App
var app = express();
var PORT = process.env.PORT || 3000;


// Server Routing Map 
// ============================================================

// Serve Static elements
app.use(express.static('public'));

app.get('/contact', function (req, res) {
  res.render('contact.html')
})

// ============================================================



// Listener - Start the server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});