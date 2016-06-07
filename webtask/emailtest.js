var sendgrid = require('sendgrid')('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');

var payload   = {
  to      : '******@gmail.com',
  from    : 'admin@auth0-sample.surge.sh',
  subject : 'Saying Hi',
  text    : 'This is my first email through SendGrid'
};

sendgrid.send(payload, function(err, json) {
  if (err) { console.error(err); }
  console.log(json);
});
