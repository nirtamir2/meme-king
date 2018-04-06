import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import PropTyps from 'prop-types';

// constants
import iconConstants from 'constants/iconConstants';

const Icon =  ({ name, top, className, onClick, isRound, size, theme, isActive }) => {

    return (
        <i style={{top : top}}
           onClick={onClick}
           className={classNames('box-icon',`size-${size}`,`theme-${theme}`, { 'clickable': _.isFunction(onClick) }, { 'active' : isActive }, { 'round': isRound }, iconConstants[name], className)}
        />
    )
}

Icon.defaultProps = {
    name: 'CLOSE',
    size: 'md',
    theme: 'default',
}

Icon.propTypes = {
    theme: PropTyps.oneOf(['default', 'white', 'black', 'pink-dark', 'pink'])
}

export default Icon;
