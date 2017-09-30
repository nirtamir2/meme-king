import React from 'react';

export default ({ setMemesPerRow, children }) => {
    return (
        <div className="box-meme-section-bar">
            {children}
            <div className="actions">
                <div  onClick={() => setMemesPerRow('increment')} className="glyphicon glyphicon-zoom-out action"/>
                <div onClick={() => setMemesPerRow('decrement')} className="glyphicon glyphicon-zoom-in action"/>
            </div>
        </div>
    )
}