import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom';

// actions
import {
    fetchMyMemes,
    fetchCategory,
    fetchWeeklyPopularMemes,
    fetchNewMemes,
    fetchAllTimePopularMemes
} from 'actions/category-actions/category-actions'
import { addOrRemoveMemeFromCollage } from 'actions/collage-actions/collage-actions'
import { showNotification } from 'actions/notification-actions/notification-actions'

// components
import MemeThumb from 'components/MemeThumb/MemeThumb'
import BtnScrollToTop from '../../components/BtnScrollToTop/BtnScrollToTop'
import Loader from 'components/Loader/Loader'
import Toolbar from 'containers/Toolbar/Toolbar'
import Generator from 'containers/Generator/Generator';
import Cropper from 'components/Cropper/Cropper';

// services
import AnalyticsService from 'services/Analytics'

class MemeSection extends Component {

    componentDidMount() {
        this.loadData(_.get(this.props, 'match.params.category'))
    };

    componentWillReceiveProps(nextProps) {
        BtnScrollToTop.scrollToTop();
        const nextCategory = _.get(nextProps, 'match.params.category');

        if (_.get(this.props, 'match.params.category') !== nextCategory) {
            this.loadData(nextCategory)
        }
    };


    loadData = (category) => {
        switch (category) {

            case 'my-memes' : {
                this.props.fetchMyMemes()
                break
            }

            case 'popular' : {
                this.props.fetchWeeklyPopularMemes()
                break
            }

            case 'new-memes': {
                this.props.fetchNewMemes()
                break
            }

            case 'all-time-popular': {
                this.props.fetchAllTimePopularMemes()
                break
            }

            default : {
                this.props.fetchCategory(category)
                break
            }
        }
    }

    handleCollageClick = (e, meme) => {

        e.preventDefault();

        const { collageMemes, collageMemeLimit, showNotification, addOrRemoveMemeFromCollage } = this.props;

        AnalyticsService.sendEvent('add meme to collage clicked');

        if ((_.size(collageMemes) === collageMemeLimit) && !_.find(collageMemes, { id: meme.id })) {
            showNotification({ message: 'כרגע אפשר להוסיף רק ' + collageMemeLimit + ' ממים לקולאז׳', type: 'danger' })
            return;
        }

        addOrRemoveMemeFromCollage(meme)
    }

    render() {

        const { memes, isFetching, isCollageMode, collageMemes, collageMemeLimit, match } = this.props;

        const category = _.get(match, 'params.category');

        const isPopularSection = (category === 'popular' || category === 'all-time-popular');

        const orderedByDate =  isPopularSection ? memes : _.values(memes).sort((a = {}, b = {}) => new Date(b.date) - new Date(a.date));

        return (
            <div className="memes-section">

                {!isFetching && <Toolbar />}

                {isFetching
                    ?
                    <Loader theme="brand"/>
                    :
                    <div className="memes-container masonry">
                        {_.map(orderedByDate, meme =>
                            <MemeThumb
                                shouldShowRatingBadge={isPopularSection}
                                key={meme.id}
                                isInCollage={_.find(collageMemes, { id: meme.id })}
                                {...meme}
                                to={`${match.url}/generator/normal/${meme.id}/normalFormat`}
                                onClick={isCollageMode ? (e) => this.handleCollageClick(e, meme) : null}
                                category={category || meme.category }
                            />
                        )}
                    </div>
                }

                <Switch>
                    <Route path={`${match.url}/generator/:type/:id/:format`} render={(props) => <Generator {...props} backgroundCategory={category} />} />
                </Switch>

            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {

    return {
        memes: state.category.memes,
        isFetching: state.category.isFetching,
        error: state.category.error,
        isCollageMode: state.collage.isCollageMode,
        collageMemes: _.get(state, 'collage.memes', {}),
        collageMemeLimit: _.get(state, 'collage.memes.limig', 4)


    }
}

function mapDispatchToProps(dispatch, ownProps) {

    return {
        fetchCategory: (category) => dispatch(fetchCategory(category)),
        fetchMyMemes: () => dispatch(fetchMyMemes()),
        fetchWeeklyPopularMemes: () => dispatch(fetchWeeklyPopularMemes()),
        fetchNewMemes: () => dispatch(fetchNewMemes()),
        fetchAllTimePopularMemes: () => dispatch(fetchAllTimePopularMemes()),
        addOrRemoveMemeFromCollage: (meme) => dispatch(addOrRemoveMemeFromCollage({ meme })),
        showNotification: (data) => dispatch(showNotification(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemeSection)
