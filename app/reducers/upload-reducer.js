import React from 'react';

import { SET_UPLOAD_IMAGE } from '../actions/upload-actions/upload-actions';

const initialState = [];

export default function (state = initialState, action) {

    const { payload, type } = action;

    switch (type) {
        case SET_UPLOAD_IMAGE:
            return {
                images: [payload]
            }
    }

    return state
}