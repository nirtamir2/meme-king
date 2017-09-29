import actionsConstants from 'actions/data-actions/data-actions-constants';

const initialState = {
    memes: []
};

export default function(state=initialState, action){

    const { payload, type } = action;

    switch(type){

        case actionsConstants.FETCH_CATEGORY_REQUEST:
            return {
                memes: payload,
                isFetching: true
            }
            break;

        case actionsConstants.FETCH_CATEGORY_SUCCESS:
            return {
                memes: payload,
                isFetching: false
            }
            break;


        case actionsConstants.FETCH_CATEGORY_FAILED:
            return {
                memes: payload,
                error: payload,
                isFetching: false
            }
            break;





        case actionsConstants.FETCH_MY_MEMES:
            return {
                isFetching: false,
                memes: payload
            }
            break;





        case actionsConstants.FETCH_WEEKLY_POPULAR_REQUEST:
            return {
                isFetching: true,
                memes: payload
            }
            break;

        case actionsConstants.FETCH_WEEKLY_POPULAR_SUCCESS:
            return {
                isFetching: false,
                memes: payload
            }
            break;

        case actionsConstants.FETCH_WEEKLY_POPULAR_FAILED:
            return {
                isFetching: false,
                memes: payload
            }
            break;





        case actionsConstants.FETCH_NEW_MEMES_REQUEST:
            return {
                isFetching: false,
                memes: []
            }
            break;

        case actionsConstants.FETCH_NEW_MEMES_SUCCESS:
            return {
                isFetching: false,
                memes: []
            }
            break;

        case actionsConstants.FETCH_NEW_MEMES_FAILED:
            return {
                isFetching: false,
                memes: []
            }
            break;





        default:
            return state



    }
}