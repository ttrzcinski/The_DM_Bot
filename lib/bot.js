var builder = require('botbuilder');
var hello = require('./dialogs/hello');
module.exports = function(connector) {
  var bot = new builder.UniversalBot(connector).set('storage', inMemoryStorage);
  var inMemoryStorage = new builder.MemoryBotStorage();
  bot.dialog('/', hello);
  
  return bot;
}