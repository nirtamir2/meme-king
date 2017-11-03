import React from 'react';

// components
import Icon from 'components/Icon/Icon';

export default ({ setMemesPerRow, children }) => {
    return (
        <div className="box-meme-section-bar">
            {children}
            <div className="actions">
                <Icon isRound  onClick={() => setMemesPerRow('increment')} name="ZOOM_OUT" className="action"/>
                <Icon isRound onClick={() => setMemesPerRow('decrement')} name="ZOOM_IN" className="action"/>
            </div>
        </div>
    )
}