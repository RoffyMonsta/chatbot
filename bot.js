//  __   __  ___        ___
// |__) /  \  |  |__/ |  |  
// |__) \__/  |  |  \ |  |  

// This is the main file for the FacebookBot bot.

// Import Botkit's core features
const { Botkit } = require('botkit');
// Import a platform-specific adapter for facebook.
const { FacebookAdapter, FacebookEventTypeMiddleware } = require('botbuilder-adapter-facebook');
const { MongoDbStorage } = require('botbuilder-storage-mongodb');
// Load process.env values from .env file
require('dotenv').config();
// bestbuy api (eslint shows this as eror(saved for later))
var bby = require('bestbuy')(process.env.BBY_API);
// mongo (eslint shows this as error(saved for later))
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

controller.ready(() => {
    controller.loadModules(__dirname + '/features');
});
