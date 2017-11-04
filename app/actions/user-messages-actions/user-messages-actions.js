import { showNotification } from 'actions/notification-actions/notification-actions';

// constants
import actionsConstnats from './user-messages-actions-constants';
import constants from 'constants/global';

// helpers
import helpers from 'helpers/helpers';

export function sendMessageToAdmin(data) {

    return (dispatch) => {

        dispatch({type : actionsConstnats.POST_PERSONAL_MESSAGE_REQUEST});

        return window.firebase.database().ref(`/${constants.database.personalMessageTable}/${data.id}`).set(data).then(() => {
            dispatch(showNotification({ message : 'ההודעה נשלחה בהצלחה!' }))
            dispatch({type : actionsConstnats.POST_PERSONAL_MESSAGE_SUCCESS})
        }).catch(error => dispatch({type : actionsConstnats.POST_PERSONAL_MESSAGE_FAILED, error : error}));


    };
}

export function fetchUserMessages(category) {

    return (dispatch) => {

        dispatch({type : actionsConstnats.FETCH_USER_MESSAGES_REQUEST});

        window.firebase.database().ref(`/${constants.database.personalMessageTable}`).once('value')
            .then(snapshot => dispatch({type : actionsConstnats.FETCH_USER_MESSAGES_SUCCESS, payload : { messages: snapshot.val() }}))
            .catch(error => dispatch({type : actionsConstnats.FETCH_USER_MESSAGES_FAILED, error : error}));

    };
}

export function fetchSingleMessage(id) {

    return dispatch => {

        window.firebase.database().ref(`/${constants.database.personalMessageTable}/${id}`).once('value')
            .then(snapshot => dispatch({type : actionsConstnats.FETCH_SINGLE_MESSAGE, payload : snapshot.val()}))
    }
}


export function updateUserMessageLikes(message) {
    const wantedLikes = message.likes ? parseInt(message.likes) + 1 : 1;
    return (dispatch) => {
        window.firebase.database().ref(`/${constants.database.personalMessageTable}/${message.id}/likes`).set(wantedLikes).then(() => {
            console.log('hy')
            return dispatch(fetchSingleMessage(message.id))
        })

    };
}