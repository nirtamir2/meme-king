import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Text =  ({ className, onClick, children, theme, size, align, inline, weight }) => {

    return (
        <p onClick={onClick} className={classNames('box-text', { 'clickable': _.isFunction(onClick) }, `weight-${weight}`, `text-${align}`, className, theme, `size-${size}`, { 'inline-block': inline })} >
            {children}
        </p>
    )
}

Text.defaultProps = {
    theme : 'white',
    size : 'md',
    weight: 300
}

Text.propTypes = {
    theme: PropTypes.oneOf(['black', 'white', 'pink', 'brand']),
    weight: PropTypes.oneOf([200,300,400,500,600]),
    size: PropTypes.oneOf(['sm', 'md' , 'lg'])
}

export default Text;
