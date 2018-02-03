import React from 'react';
import classNames from 'classnames';

export default ({ children, theme }) => {
    return (
        <div className={classNames('box-meme-section-bar', theme)}>
            <div className="inner-container">
                {children}
            </div>
        </div>
    )
}