import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const SpinnerDots = ({ className, size, theme,  ...rest }) => (
    <div className={classNames("box-spinner-dots", `theme-${theme}`, `size-${size}`, className)}><div></div><div></div><div></div><div></div></div>
);

SpinnerDots.defaultProps = {
    size: 'sm',
    theme: 'black'
}

SpinnerDots.propTypes = {
    size: PropTypes.oneOf(['md', 'lg']),
    theme: PropTypes.oneOf(['black'])
}

export default SpinnerDots;