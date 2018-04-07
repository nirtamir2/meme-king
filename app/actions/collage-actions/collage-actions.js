
import collageConstants  from './collage-actions-constants';
const { SET_COLLAGE_STATE, ADD_OR_REMOVE_MEME_FROM_COLLAGE, RESET_COLLAGE_MEMES } = collageConstants;
import { showNotification } from 'actions/notification-actions/notification-actions';

export function setCollageMode({ isCollageMode }) {

    return dispatch => {

        const alreadySeenModalMessage = LocalStorageService.getItem('seenCollageMessage');

        if (isCollageMode) {
            dispatch(showNotification({ message: 'מצב קולאז׳ מופעל, בחרו עד 4 ממים לשילוב יחדיו' }));
           // LocalStorageService.setItem('seenCollageMessage', 'true')
        }

        return  dispatch({
            type: SET_COLLAGE_STATE,
            payload: { isCollageMode }
        })
    }

}

export function addOrRemoveMemeFromCollage({ meme }) {
    return  {
        type: ADD_OR_REMOVE_MEME_FROM_COLLAGE,
        payload: { meme }
    }
}

export function resetCollageMemes() {
    return  {
        type: RESET_COLLAGE_MEMES,
        payload: {}
    }
}
