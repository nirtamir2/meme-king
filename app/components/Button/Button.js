import React from 'react';
import classNames from 'classnames';

// components
import Icon from 'components/Icon/Icon';

const Button =  ({ onClick, icon, label, htmlFor, className, center, children, size, isLoading }) => {

    const text = (label || children)

    return (
        <label htmlFor={htmlFor} className={classNames("box-cta-button", className, `size-${size}`)} onClick={onClick}>
            {isLoading ?
                <div id="activityIndicator" className="activityIndicator"/>
                :
                <span className="flex inner-container">
                    {text && <span className={classNames('text',{'center text-center': center})}>{text}</span> }
                    {icon && <Icon name={icon} />}
                </span>

            }

        </label>
    )
}

Button.defaultProps = {
    size: 'md'
}

export default Button;
