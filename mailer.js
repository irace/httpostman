var mandrill = require('mandrill-api/mandrill');

module.exports = function (api_key, params, callback) {
  var mandrill_client = new mandrill.Mandrill(api_key);

  mandrill_client.messages.send({
    message: {
      subject: params.subject,
      text: params.body,
      from_email: params.from,
      to: [{ 
        email: params.to
      }]
    } 
  }, 
  function (result) {
    callback(null, result);
  }, 
  function (error) {
    callback(error);
  });
};
