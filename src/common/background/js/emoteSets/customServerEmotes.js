function parseEmotes(json) {
    var result = {};
    
    var BASE_EMOTE_URL = json.baseurl; //'https://cdn.betterttv.net/emote/{EMOTE_ID}/1x'
    var channelName = json.channelName;

    var emotes = json.emotes;
    for (var i = 0; i < emotes.length; ++i) {
        var emote = emotes[i];

        result[emote.code] = {
            url: BASE_EMOTE_URL.replace('{EMOTE_ID}', emote.id),
            channel: channelName
        };
    }

    return result;
}

module.exports = {
    parseEmotes: parseEmotes
};