import React from 'react';
import classNAmes from 'classnames';

export default ({ children, className, disabled }) => (
    <div className={classNAmes({"box-popup-cover" : !disabled}, className)}>
        {children}
    </div>
)