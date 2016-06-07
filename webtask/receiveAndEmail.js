var app = new (require('express'))();
var wt = require('webtask-tools');
var util = require('util');
var sendgrid = require('sendgrid');

function contentFrom(body) {
  return util.format('', body.name, body.email);
}

app.post('/', function (req, res) {
  var payload = {
    to: req.webtaskContext.data.DESTINATION_EMAILS,
    from: 'admin@auth0-sample.surge.sh',
    subject: 'User data',
    text: contentFrom(req.webtaskContext.body)
  };

  console.log(payload);

  sendgrid(req.webtaskContext.data.SENDGRID_API_KEY).send(payload, function (err, json) {
    if (err) {
      return res.status(500).send("Error sending data.");
    }
    res.end();
  });
});

module.exports = wt.fromExpress(app).auth0();
