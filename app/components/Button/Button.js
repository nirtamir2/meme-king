import React from 'react';
import classNames from 'classnames';

export default ({ onClick, icon, label, htmlFor, className, center }) => {

    return (
        <label htmlFor={htmlFor} className={classNames("box-cta-button", className)} onClick={onClick}>
            <span className="text center"> {label} </span> {icon && <span className={icon} />}
        </label>
    )
}
