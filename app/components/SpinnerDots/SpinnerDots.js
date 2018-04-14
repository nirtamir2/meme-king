import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const SpinnerDots = ({ className, size,  ...rest }) => (
    <div className={classNames("lds-ellipsis", `size-${size}`, className)}><div></div><div></div><div></div><div></div></div>
);

SpinnerDots.defaultProps = {
    size: 'sm',
}

SpinnerDots.propTypes = {
    size: PropTypes.oneOf(['md', 'lg'])
}

export default SpinnerDots;