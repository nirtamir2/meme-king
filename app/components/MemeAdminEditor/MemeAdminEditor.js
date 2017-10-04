import _ from 'lodash';
import React from 'react';

import menu from 'constants/menu';

export default ({  urlPath, onSave, id, onCategoryChange }) => {
    return (
        <div className="container">
            <div className="col-xs-6">
                <input placeholder="description" />
                <select onChange={(event) => onCategoryChange(id, event.target.value)}>
                    {_.map(menu, (value, prop) => {
                        return <option>{prop}</option>
                    })}
                </select>
                <button onClick={() => onSave(id)}> save meme </button>
            </div>
            <div className="col-xs-6">
                <img src={urlPath} style={{width: '200px'}} />
            </div>
        </div>
    )
}