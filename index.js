var express = require('express');
var app = express();

var allHappyCalls = [];

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  var currentHappiNess = 8;
    response.render('pages/index', {
        currentHappiNess: currentHappiNess
    });
});

app.get('/status', function(req, res) {
    var total = 0;
    for (var i in allHappyCalls) {
      total += parseInt(allHappyCalls[i]);
    }

    var status = {
      "count": allHappyCalls.length,
      "average" : total / allHappyCalls.length
    };

    res.send(status);
});

app.get('/submit', function (req, res) {
    allHappyCalls.push(req.query.happiness);

    var total = 0;
    for (var i in allHappyCalls) {
      total += parseInt(allHappyCalls[i]);
    }

    console.log("Summe:" + total);
    console.log("Average:" + total / allHappyCalls.length);

    res.send('A message!');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
