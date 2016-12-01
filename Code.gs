function doPost(e) {
  Logger.log(e);
  // Basic Configuration
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var bot_name = "Translator Amanda";
  var bot_icon = "http://sample.sample/Amanda.jpg";
  var verify_token = "YOUR_TOKEN"
  
  // You need to have varid token
  if (verify_token != e.parameter.token) {
    throw new Error("invalid token.");
  };
  
  var app = SlackApp.create(token);
  
  /* Process Messages from Slack 
  Sample Input message
  "@amanda en ja Hello. Nice to meet you."
  */
  // Remove "@amanda "
  var body = e.parameter.text.substr(8);
  // Find the input language
  var original_lan = body.substr(0,2);
  // Find the output language
  var convert_lan = body.substr(3,2);
  // Find the message
  var message = body.substr(6);
  // Translate the message
  var message = LanguageApp.translate(message, original_lan, convert_lan);

  // return to the slack channel
  return app.postMessage(e.parameter.channel_id, message, {
    username: bot_name,
    icon_url: bot_icon
  });
}
