// winston logger
var log = require('winston');
const logger = log.createLogger({
    level: 'info',
    format: log.format.json(),
    transports: [
      new log.transports.File({ filename: 'logs/greeting.log' })
    ]
  });
//get requiries
var request = require('request');
require('dotenv').config();
//headers authorization
var headers = {
    'Content-Type': 'application/json'
};
//request body part
var dataStr = {
    "setting-type":"call_to_actions",
    "thread_state":"new_thread",
    //get_started button
    "get_started": {
        "payload": "GET_STARTED_PAYLOAD"
    },
    //text on start screen
    "greeting": [
        {
            "locale":"default",
            "text":"Hello {{user_first_name}}!"
        }
        ],
    //menu
    "persistent_menu": [
            {
                "locale": "default",
                "composer_input_disabled": false,
                "call_to_actions": [
                    {
                        "type": "postback",
                        "title": "Main menu",
                        "payload": "MAIN_MENU_PAYLOAD"
                    },
                    {
                        "type": "postback",
                        "title": "Product catalog",
                        "payload": "PRODUCT_CATALOG_PAYLOAD"
                    }
                ]
            }
        ]
};
//request
var options = {
    url: 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token='+process.env.FACEBOOK_ACCESS_TOKEN,
    method: 'POST',
    headers: headers,
    body: dataStr,
    json: true
};
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        logger.info(body);
    }
}
request(options, callback);