// Node Dependencies
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

// Set up Express App
var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));

// Express-Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Node Emailer
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'erenasports@gmail.com', // Your email id
      pass: 'JonandTom6' // Your password
  }
})


// Server Routing Map 
// ============================================================

// Serve Static elements
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/contact', function (req, res) {
  res.render('contact')
})

app.post('/email-us', function(req, res) {

  var email = req.body.email;
  var person = req.body.name;
  var message = req.body.message;
  var text = 'Thank you for your message, ' + person + '! Erena Sports will contact you! \n\n' + message;

  var mailOptions = {
    from: 'erenasports@gmail.com', // our email address
    to: email, // sender email address
    cc: 'erenasports@gmail.com', // cc our email address
    subject: 'Erena Sports!', // subject line
    text: text // message
  };

  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
          res.send('<h1>Mailing Error!</h1> <p>Please try again <a href="/contact">here</a> or email us directly at <a href="mailto:erenasports@gmail.com">erenasports@gmail.com</a>.</p>');
      }else{
          console.log('Message sent: ' + info.response);
          res.send('<h1>Thank you!</h1> <p>Please close this tab or navigate back to the <a href="/">homepage</a>.</p>');
      };
  });

})

app.get('*', function(req, res) {
  res.send('<h1>You have wandered astray!</h1> <p>Please navigate back to the <a href="/">homepage</a>.</p>'); 
})

// ============================================================


// Listener - Start the server
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});