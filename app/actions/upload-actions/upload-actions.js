
export const SET_UPLOAD_IMAGE = 'SET_UPLOAD_IMAGE';
export const REMOVE_UPLOAD_IMAGE = 'REMOVE_UPLOAD_IMAGE';


export const setUploadImage = (image) => {
    return {
        type: SET_UPLOAD_IMAGE,
        payload: image
    }

}