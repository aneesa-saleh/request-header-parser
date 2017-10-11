

// init project
var express = require('express');
var os = require('os');
var app = express();
var device = require('express-device');

app.use(device.capture());

// set dir to serve static files
app.use(express.static('public'));

// handle home page
app.get("/", function (request, response) {
  response.status(200);
  response.sendFile(__dirname + '/views/index.html');
});

// handle header parser request
app.get("/api/whoami", function (request, response) {
  response.status(200);
  var ip = request.header('x-forwarded-for') || request.connection.remoteAddress;
  ip = ip.split(',')[0];                              //get first value only
  var language = request.headers["accept-language"]
                  .split(',')[0];                     //get first value only

      var os_string = os.platform();
      var header_info = {
        "IP address": ip,
        "Language": language,
        "Operating System": os_string
      };

  response.send(request.device.type.toUpperCase());
  //response.json(header_info);
  //});
  
});

//handle 404 (page not found)
app.get('*', function(request, response){
  response.status(404);
  response.sendFile(__dirname + '/views/404.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  //console.log('Your app is listening on port ' + listener.address().port);
});
