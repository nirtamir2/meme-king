import _ from 'lodash';
import React  from 'react';
import LazyLoad from 'react-lazyload';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// components
import { Link } from 'react-router-dom';
import Icon from 'components/Icon/Icon';

// constants
import globalConstants from 'constants/global';

// helpers
import helpers from 'helpers/helpers';

// assets
import smallCrown from 'assets/images/small-crown.png';

const MemeThumb = ({ thumbPath, description, rating, theme, to, urlPath, onClick=_.noop, shouldShowRatingBadge, query, className, hidden, isInCollage }) => {


    const computedRating = (rating * 4) + helpers.getRandomNumber(0,1);

    if(hidden) {
        return null;
    }

    return(

        <Link className={classNames(className, 'meme-thumb', `theme-${theme}`, { 'marked-in-collage': isInCollage })} to={to} onClick={onClick}>
            <img src={thumbPath || urlPath} alt={description} className="meme-thumb__img" />
            {(shouldShowRatingBadge && rating) && (
                <span className="meme-thumb__download-counter">
                    <img src={smallCrown} className="crown"/>
                    <span>{computedRating}</span>
                </span>
            )}
            {isInCollage && (
                <Icon className="in-collage-badge" theme="pink" name="CHECK" />
            )}
            <div className="meme-thumb__overlay">
                <p className="meme-thumb__details">
                    <span className="meme-thumb__description">
                        {description}
                    </span>
                </p>
            </div>
        </Link>

    )
}

MemeThumb.propTypes = {
    theme: PropTypes.oneOf(['full-width', 'default'])
}

MemeThumb.defaultProps = {
    theme: 'default'
}

export default  MemeThumb;