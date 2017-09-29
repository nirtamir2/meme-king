import React from 'react';
import classNames from 'classnames';

export default ({ icon, text, onClick, className }) => {

    return (
        <div className={classNames(className , 'text-control__btn')} onClick={onClick}>
            {icon ? <span className={icon}/> : text}
        </div>
    );
}