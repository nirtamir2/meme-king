import React from 'react';
import classNames from 'classnames';

const Text =  ({ className, onClick, children, theme, size, align, inline }) => {

    return (
        <p onClick={onClick} className={classNames('box-text',`text-${align}`, className, theme, `size-${size}`, { 'inline-block': inline })} >
            {children}
        </p>
    )
}

Text.defaultProps = {
    theme : 'white',
    size : 'md'
}

export default Text;
