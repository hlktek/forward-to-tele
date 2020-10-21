const axios = require('axios');
const config = require('./config');

const send = (message, receiver) => {
    if (!receiver) {
        receiver = config.TELEGRAM_RECEIVER;
    }
    axios.get(`https://api.telegram.org/${config.TELEGRAM_BOT_TOKEN}/sendmessage`, {
        params: {
            chat_id : receiver,
            text : message
        }
    })
    .then(function (response) {
        console.log(`Send success: ${message}`);
    })
    .catch(function (error) {
        console.error(error);
    })
    .finally(function () {
        // always executed
    }); 
}
module.exports = {send}