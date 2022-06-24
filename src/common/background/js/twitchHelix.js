var httpRequest = require('./httpRequest');

const CHANNEL_ID_ENDPOINT = 'https://api.twitch.tv/helix/users?login={CHANNEL_NAME}';
const CLIENT_ID = '8u46rkmb38ovr4be1xue3hbb0ooagj';
const CLIENT_SECRET = '';
const BEARER_TOKEN_ENDPOINT = 'https://id.twitch.tv/oauth2/token?client_id={CLIENT_ID}&grant_type=client_credentials&client_secret={CLIENT_SECRET}'

function getBearerToken() {
    return new Promise(function(resolve, reject) {
        var url = BEARER_TOKEN_ENDPOINT.replace('{CLIENT_ID}', CLIENT_ID).replace('{CLIENT_SECRET}', getClientSecret());
        httpRequest.get(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.twitchtv.v5+json'
            }
        }).then(function(responseJSON) {
            console.log(responseJSON);
            resolve(responseJSON.access_token);
        }).catch(function(error) {
            console.error('Failed to retrieve access token  from url ' + url +' - Error:' + error);
            reject(error);
        });
    });
}

function getChannelIdFromName(channel_name) {
    return new Promise(function(resolve, reject) {
        console.log('Retrieving id for "' + channel_name + '" from twitch...');

        getBearerToken().then(function(access_token) {
            httpRequest.get(CHANNEL_ID_ENDPOINT.replace('{CHANNEL_NAME}', channel_name), {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.twitchtv.v5+json',
                    'Authorization': 'Bearer ' + access_token,
                    'Client-Id': CLIENT_ID
                }
            }).then(function(responseJSON) {
                console.log(responseJSON);
    
                resolve(responseJSON.data[0].id);
            }).catch(function(error) {
                console.error(error);
    
                reject(channel_name);
            });
        }).catch(reject);
        
    });
}

function getClientSecret() {
    return CLIENT_SECRET; // twitch client secret
}

function getClientID() {
    return CLIENT_ID;
}

module.exports = {
    getClientID: getClientID,
    getBearerToken: getBearerToken,
    getChannelIdFromName: getChannelIdFromName
};