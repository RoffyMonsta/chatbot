/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

//export this module
module.exports = function(controller) {
    //import winston-logger
    var log = require('../modules/logger');
    //quick-replies menu buttons
    const quickReply = {
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
    };
    //get a postback
    controller.on('facebook_postback', async(bot, message) => {
        //when user presses Get Started
        if(message.postback.payload == 'GET_STARTED_PAYLOAD'){
            log.logger.info(message.postback.payload);
            await bot.reply(message, 'Welcome to my channel!');
            }

        //when user hits main menu button on persistent menu, quick replies appear
        if(message.postback.payload == 'MAIN_MENU_PAYLOAD'){
            log.logger.info(message.postback.payload);
            await bot.reply(message, quickReply);
        }
        
    });
}