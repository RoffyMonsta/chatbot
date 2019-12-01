//  __   __  ___        ___
// |__) /  \  |  |__/ |  |  
// |__) \__/  |  |  \ |  |  

// This is the main file for the FacebookBot bot.

// Import Botkit's core features
var log = require('winston');
// winston logger
const logger = log.createLogger({
    level: 'info',
    format: log.format.json(),
    transports: [
      new log.transports.Console(),
      new log.transports.File({ filename: 'logs/bot.log' })
    ]
  });
const { Botkit } = require('botkit');
// Import a platform-specific adapter for facebook.
const { FacebookAdapter, FacebookEventTypeMiddleware } = require('botbuilder-adapter-facebook');
const { MongoDbStorage } = require('botbuilder-storage-mongodb');
// Load process.env values from .env file
require('dotenv').config();
// mongo
let storage = null;
if (process.env.MONGO_URI) {
    const mongoStorage = new MongoDbStorage({
        url : process.env.MONGO_URI,
    });
}
//create adapter
const adapter = new FacebookAdapter({
    verify_token: process.env.FACEBOOK_VERIFY_TOKEN,
    access_token: process.env.FACEBOOK_ACCESS_TOKEN,
    app_secret: process.env.FACEBOOK_APP_SECRET,
})

// emit events based on the type of facebook event being received
adapter.use(new FacebookEventTypeMiddleware());
const controller = new Botkit({
    webhook_uri: '/api/messages',
    adapter: adapter,
    storage
});
// version of BotKit
controller.webserver.get('/', (req, res) => {
    res.send(`This app is running Botkit ${ controller.version }.`);
});
// gets postback from server
controller.on('facebook_postback', async(bot, message) => {
    //when user presses Get Started
    if(message.postback.payload == 'GET_STARTED_PAYLOAD'){
        logger.info(message.postback.payload)
        await bot.reply(message, 'Welcome to my channel!');
        }
    //when user hits main menu button on persistent menu, quick replies appear
    if(message.postback.payload == 'MAIN_MENU_PAYLOAD'){
        logger.info(message.postback.payload)
        await bot.reply(message, {
            text: 'Main menu', 
            quick_replies: [
                {
                    "content_type":"text",
                    "title":"My purchases",
                    "payload":"MY_PURCHASES_PAYLOAD"
                },
                {
                    "content_type":"text",
                    "title":"Shop",
                    "payload":"SHOP_PAYLOAD"
                },
                {
                    "content_type":"text",
                    "title":"Favorites",
                    "payload":"FAVORITES_PAYLOAD"
                },
                {
                    "content_type":"text",
                    "title":"To invite a friend",
                    "payload":"INVITE_FRIEND_PAYLOAD"
                }
            ]
        });
    }
    
});