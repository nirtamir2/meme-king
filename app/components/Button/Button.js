import React from 'react';
import classNames from 'classnames';

// components
import Icon from 'components/Icon/Icon';

const Button =  ({ onClick, icon, label, htmlFor, className, center, children, size }) => {

    const text = (label || children)

    return (
        <label htmlFor={htmlFor} className={classNames("box-cta-button", className, `size-${size}`)} onClick={onClick}>
            {text && <span className={classNames('text',{'center text-center': center})}>{text}</span> }
            {icon && <Icon name={icon} />}
        </label>
    )
}

Button.defaultProps = {
    size: 'md'
}

export default Button;
