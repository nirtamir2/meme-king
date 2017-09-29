import React from 'react';

import { TOGGLE_SIDEBAR } from '../actions/index';

export default function(state=false, action){

    const {payload, type} = action;
    switch(type){
        case TOGGLE_SIDEBAR:
            return payload
    }
    return state;
}