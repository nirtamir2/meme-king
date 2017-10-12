import { CALL_API } from 'redux-api-middleware';

// config
import config from 'config/config';

// constants
import dataActionConstants from './category-actions-constants';
import constants from 'constants/global';

// services
import localStorageService from 'services/LocalStorage';

export function fetchCategory(category) {

    return (dispatch) => {

        dispatch({type : dataActionConstants.FETCH_CATEGORY_REQUEST, payload: {name : category}});

        window.firebase.database().ref(`/${constants.database.memesTable}/${category}`).once('value')
            .then(snapshot => dispatch({type : dataActionConstants.FETCH_CATEGORY_SUCCESS, payload : { memes: snapshot.val() , name: category }}))
            .catch(error => dispatch({type : dataActionConstants.FETCH_CATEGORY_FAILED, error : error}));

    };
}

export function fetchSingleMeme(category, id) {
    return (dispatch) => {

        dispatch({type : dataActionConstants.FETCH_SINGLE_MEME_REQUEST, payload: []});

        window.firebase.database().ref(`/${constants.database.memesTable}/${category}/${id}`).once('value')
            .then(snapshot => dispatch({type : dataActionConstants.FETCH_SINGLE_MEME_SUCCESS, payload : snapshot.val()}))
            .catch(error => dispatch({type : dataActionConstants.FETCH_SINGLE_MEME_FAILED, error : error}));

    };
}

export function fetchMyMemes() {
    return {
        payload: localStorageService.getItem('myMemes'),
        type: dataActionConstants.FETCH_MY_MEMES
    }
}

export function fetchWeeklyPopularMemes() {

    return  {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/get-weekly-popular-memes`,
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            types: [
                dataActionConstants.FETCH_WEEKLY_POPULAR_REQUEST,
                dataActionConstants.FETCH_WEEKLY_POPULAR_SUCCESS,
                dataActionConstants.FETCH_WEEKLY_POPULAR_FAILED
            ],
        }
    }
};

export function fetchNewMemes() {

    return  {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/new-memes`,
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            types: [
                dataActionConstants.FETCH_NEW_MEMES_REQUEST,
                dataActionConstants.FETCH_NEW_MEMES_SUCCESS,
                dataActionConstants.FETCH_NEW_MEMES_FAILED
            ],
        }
    }
};


export function fetchAllTimePopularMemes() {
    return  {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/all-time-popular-memes`,
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            types: [
                dataActionConstants.FETCH_ALL_TIME_POPULAR_MEMES_REQUEST,
                dataActionConstants.FETCH_ALL_TIME_POPULAR_MEMES_SUCCESS,
                dataActionConstants.FETCH_ALL_TIME_POPULAR_MEMES_FAILED
            ],
        }
    }
}
