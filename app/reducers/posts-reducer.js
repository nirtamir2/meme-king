

import actionsConstants from 'actions/admin-actions/admin-actions-constants';

const initialState = { isLoading: false};

export default function(state=initialState, action){

    const { payload, type } = action;

    switch(type){
        case actionsConstants.POST_PERSONAL_MESSAGE_REQUEST:
            return {
                isLoading: true
            }
            break;

        case actionsConstants.POST_PERSONAL_MESSAGE_SUCCESS:
            return {
                isLoading: false
            }
            break;


        case actionsConstants.POST_PERSONAL_MESSAGE_FAILED:
            return {
                isLoading: false
            }
            break;

        default:
            return initialState

        return initialState;



    }
}