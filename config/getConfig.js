require('dotenv').config();

const getTrelloEnv = (envVar) => {
    if (!envVar) {
        throw new Error('Missing environment variable');
    }
    let ayo = process.env.TRELLO_API_KEY;
    const value = process.env[envVar];

    if (!value) {
        throw new Error(`Environment variable ${envVar} is not set`);
    }
    return value;
}

exports.getTrelloEnv = getTrelloEnv