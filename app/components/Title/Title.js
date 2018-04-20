import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Title = ({ size, children, className, align, theme, direction, italic, ...rest }) => {

    const TagName = size;

    return (
        <TagName
            className={classNames(className, `text-${align}`, `theme-${theme}`, size, `direction-${direction}`, 'box-title', { italic })}
            {...rest}
        >
            {children}
        </TagName>
    )
}

Title.defaultProps = {
    size: 'h1',
    children: '',
    align: 'center',
    theme: 'default'
}

Title.propTypes = {
    theme: PropTypes.oneOf(['black', 'white', 'default', 'gray-dark'])
}

export default Title
