import _ from 'lodash';
import React, { Component } from 'react';

// components
import Button from 'components/Button/Button';

// helpers
import helpers from 'helpers/helpers';

import menu from 'constants/menu';

export default ({ updateDescription, image, updateCategory, id }) => {


    return(
        <div>
            <img src={image} style={{width: 200}} />
            <input placeholder="description" onChange={() => updateCategory(id)} />
            <select placeholder="category" onChange={() => updateCategory(id)}>
                {_.map(menu, (value, prop) => {
                   return <option value={prop}>{prop}</option>
                })}
            </select>
        </div>
    )
}