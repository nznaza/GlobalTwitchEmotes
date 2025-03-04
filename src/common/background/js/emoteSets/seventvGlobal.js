const GLOBAL_EMOTES_ENDPOINT = 'https://api.7tv.app/v2/emotes/global';
const BASE_EMOTE_URL = 'https://cdn.7tv.app/emote/{EMOTE_ID}/1x'


function parseEmotes(json) {
    var result = {};

    for (var i = 0; i < json.length; ++i) {
        var emote = json[i];

        result[emote.name] = {
            url: BASE_EMOTE_URL.replace('{EMOTE_ID}', emote.id),
            channel: '7TV Emote'
        };
    }

    return result;
}

module.exports = {
    parseEmotes: parseEmotes,
    getURL: function() {
        return GLOBAL_EMOTES_ENDPOINT;
    }
};