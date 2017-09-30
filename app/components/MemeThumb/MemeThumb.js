import _ from 'lodash';
import React  from 'react';
import LazyLoad from 'react-lazyload';

// components
import { Link } from 'react-router-dom';

// constants
import globalConstants from 'constants/global';

// helpers
import helpers from 'helpers/helpers';

export default ({ thumbPath, description, rating, category, id, urlPath, width, onClick=_.noop, urlLinkDisabled }) => {

    const imageHeight = helpers.isMobile() ? (width * 3) : (width * 10);

    return(

        <Link className="meme-thumb" style={{ width: `${width}%`, height: `${imageHeight}px` }} to={`/memes/${category}/generator/${id}/${globalConstants.format.normal}` } onClick={onClick}>
            {/*<LazyLoad  offset={window.innerWidth > 767 ? 100 : 300} height={window.innerWidth < 767 ? 100 : 160}>*/}
            <img src={thumbPath || urlPath} alt={description} className="meme-thumb__img" />
            {/*</LazyLoad>*/}
            <div className="meme-thumb__overlay">
                <p className="meme-thumb__description">
                    - מחולל הממים -
                    {rating && <span className="meme-thumb__download-counter"><br/> {rating * 4} הורדות  </span>}
                    <br/>
                    {description}
                </p>
            </div>
        </Link>

    )
}

