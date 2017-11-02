import { showNotification } from 'actions/notification-actions/notification-actions';

// constants
import actionsConstnats from './admin-actions-constants';
import constants from 'constants/global';

// helpers
import helpers from 'helpers/helpers';

export function sendMessageToAdmin(data) {

    return (dispatch) => {

        dispatch({type : actionsConstnats.POST_PERSONAL_MESSAGE_REQUEST});

        return window.firebase.database().ref(`/${constants.database.personalMessageTable}/${helpers.uniqueId()}`).set(data).then(() => {
            dispatch(showNotification({ message : 'ההודעה נשלחה בהצלחה!' }))
            dispatch({type : actionsConstnats.POST_PERSONAL_MESSAGE_SUCCESS})
        }).catch(error => dispatch({type : actionsConstnats.POST_PERSONAL_MESSAGE_FAILED, error : error}));


    };
}