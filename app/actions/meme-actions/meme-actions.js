import { CALL_API } from 'redux-api-middleware';

// config
import config from 'config/config';

export function updateMemeRating(meme) {

    return  {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/update-meme-rating`,
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            body: JSON.stringify(meme)
        }
    }
}


export function saveUserMemeToStorage(meme) {

    return  {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/save-user-meme`,
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            body: JSON.stringify(meme)
        }
    }
}