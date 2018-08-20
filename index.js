require('dotenv').config()
var restify = require('restify');
var builder = require('botbuilder');
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_BOT_APP_ID,
    appPassword: process.env.MICROSOFT_BOT_APP_PASSWORD
});
var bot = require('./lib/bot')(connector);
server.post('/api/v1/messages', connector.listen());