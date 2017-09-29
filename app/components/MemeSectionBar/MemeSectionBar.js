import React from 'react';

export default ({ setMemesPerRow }) => {
    return (
        <div className="box-meme-section-bar">
            <div onClick={() => setMemesPerRow('increment')} className="glyphicon glyphicon-minus"/>
            <div onClick={() => setMemesPerRow('decrement')} className="glyphicon glyphicon-plus"/>
        </div>
    )
}