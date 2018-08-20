/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);
bot.set('storage', tableStorage);

bot.dialog('/', function (session) {
    var response = '...';
    // TODO  Check, if give var is a string and is not empty after trim
    var request = session.message.text.toLowerCase();
    var avatar;
    switch (request) {
        case 'pancakes':
            response = "Do you like pancakces?\n1) Yes\n2) No"
            // TODO Rise here a flag, that next request should be an answer to given question
            break;

        case 'who made you?':
            response = 'This guy..';
            avatar = 'author';
            break;

        default:
            response = 'You said ' + session.message.text;
            break;
    }
    // Choose right image
    var avatar_url = null;
    switch (avatar) {
        case 'author':
            avatar_url = 'https://avatars2.githubusercontent.com/u/12435750?s=460&v=4';
            break;

        default:
            avatar_url = 'https://d1u5p3l4wpay3k.cloudfront.net/futuramaworldsoftomorrow_gamepedia_en/d/d9/Goal_Bender_Golden_2.png?version=c796ddd6a419a0f7f1babcd61c99c8bf';
            break;
    }
    // Send right response in text
    session.send(response);
    // Send an image with gold bender
    var msg = new builder.Message(session)
            .attachments([{
                contentType: "image/png",
                contentUrl: avatar_url
            }]);
    session.endDialog(msg);
});