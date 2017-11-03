import React from 'react';
import classNames from 'classnames';

// constants
import iconConstants from 'constants/iconConstants';

const Icon =  ({ name, className, onClick, isRound }) => {

    return (
        <i onClick={onClick} className={classNames('box-icon', { 'round': isRound }, iconConstants[name], className)} />
    )
}

Icon.defaultProps = {
    name: 'CLOSE'
}

export default Icon;
