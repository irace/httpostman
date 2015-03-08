var bodyParser  = require('body-parser')
  , credentials = require('./credentials.json')
  , mailer      = require('./mailer.js')
  , express     = require('express')
  , app         = express();

app.use(bodyParser.json());

app.post('/', function (request, response) {
  console.log('Received request with body: ' + JSON.stringify(request.body));

  var params = {
    to: request.body.to || credentials.DEFAULT_TO_EMAIL,
    from: request.body.from,
    subject: request.body.subject,
    body: request.body.body
  };

  mailer(credentials.MANDRILL_KEY, params, function (error, result) {
    if (error) {
      console.log(error);
    }

    response.sendStatus(200);
  });
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Listening on port " + port);
});
