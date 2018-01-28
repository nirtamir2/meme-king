import _ from 'lodash';
import React  from 'react';
import LazyLoad from 'react-lazyload';
import classNames from 'classnames';

// components
import { Link } from 'react-router-dom';

// constants
import globalConstants from 'constants/global';

// helpers
import helpers from 'helpers/helpers';

// assets
import smallCrown from 'assets/images/small-crown.png';

export default ({ thumbPath, description, rating, category, id, urlPath, width, onClick=_.noop, shouldShowRatingBadge, query, className, hidden }) => {

    const location = {
        pathname: `/memes/${category}/generator/${id}/${globalConstants.format.normal}`,
        query
    }

    const computedRating = (rating * 4) + helpers.getRandomNumber(0,1);

    if(hidden) {
        return null;
    }

    return(

        <Link className={classNames(className, 'meme-thumb')} to={location} onClick={onClick}>
            <img src={thumbPath || urlPath} alt={description} className="meme-thumb__img" />
            {(shouldShowRatingBadge && rating) && (
                <span className="meme-thumb__download-counter">
                    <img src={smallCrown} className="crown"/>
                    <span>{computedRating}</span>
                </span>
            )}
            <div className="meme-thumb__overlay">
                <p className="meme-thumb__details">
                    <span className="meme-thumb__description">
                        {description}
                    </span>
                    <br/>
                </p>
            </div>
        </Link>

    )
}

