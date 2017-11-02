import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// actions
import { fetchMyMemes, fetchCategory, fetchWeeklyPopularMemes, fetchNewMemes, fetchAllTimePopularMemes } from 'actions/category-actions/category-actions';

// components
import MemeThumb from 'components/MemeThumb/MemeThumb'
import BtnScrollToTop from '../../components/BtnScrollToTop/BtnScrollToTop';
import Loader from 'components/Loader/Loader';
import MemeSectionBar from 'components/MemeSectionBar/MemeSectionBar';
import EmptyState from 'components/EmptyState/EmptyState';
import SearchInput from 'components/SearchInput/SearchInput';

// helpers
import helpers from 'helpers/helpers';

 class MemeSection extends Component {

     state = {
         memesPerRow : helpers.isMobile() ? 3 : 8,
         searchValue : ''
     }

    componentWillMount(){
        this.loadData(this.props.category)
    };

    componentWillReceiveProps(nextProps){
        BtnScrollToTop.scrollToTop();
        if(this.props.category !== nextProps.category) {
            this.loadData(nextProps.category);
            this.setState({ searchValue: '' })
        }
    };


    loadData = (category) => {

        switch (category) {

            case 'my-memes' : {
                this.props.fetchMyMemes();
                break;
            }

            case 'popular' : {
                this.props.fetchWeeklyPopularMemes();
                break;
            }

            case 'new-memes': {
                this.props.fetchNewMemes();
                break;
            }

            case 'all-time-popular': {
                this.props.fetchAllTimePopularMemes();
                break;
            }

            default : {
                this.props.fetchCategory(category);
                break;
            }
        }
    }

    setMemesPerRow = (action) => {
        const { memesPerRow } = this.state;
        switch (action) {
            case 'increment' : {
                this.setState( { memesPerRow : memesPerRow + 1});
                break;
            }
            case 'decrement' : {
                this.setState( { memesPerRow : memesPerRow - 1});
                break;
            }
        }
    }

    render() {

        const { memes, isFetching, category } = this.props;
        const isPopoularSection = (category === 'popular' || category === 'all-time-popular');

        if(isFetching){
            return <Loader />
        }

        else if (_.isEmpty(memes)) {
            return (
                <EmptyState />
            )
        }

        const filteredMemes = _.filter(memes, meme => _.includes( meme.description || '', this.state.searchValue));



        const arrayMemes = _.values(filteredMemes) || [];
        const sortedMemes = isPopoularSection ? arrayMemes :  arrayMemes.sort((a, b) => new Date(b.date) - new Date(a.date));
        const memesToShow = (_.size(sortedMemes) > 0 ? sortedMemes : memes);
        const isMemesBeenSearchedAndNoResultsFound =((_.size(this.state.searchValue) > 2) && (_.isEmpty(filteredMemes)))

        return (
            <div className="memes-section">
                <MemeSectionBar setMemesPerRow={this.setMemesPerRow}>
                    <SearchInput onChange={query => this.setState({ searchValue : query })}
                                 clearResults={() => this.setState({ searchValue : '' })}
                                 isFetching={false}
                                 emptyState={isMemesBeenSearchedAndNoResultsFound}
                                 className="hidden-xs header-search-input"
                                 value={this.state.searchValue}

                    />
                </MemeSectionBar>
                <div className="memes-container">
                    {_.map(memesToShow, meme =>
                        <MemeThumb
                            shouldShowRatingBadge={category === 'popular' || category ==='all-time-popular'}
                            width={100 / this.state.memesPerRow}
                            key={meme.id}
                            {...meme}
                            category={category || meme.category }
                        />
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {

    return {
       category: ownProps.category,
       memes : state.category.memes,
       isFetching : state.category.isFetching,
       error: state.category.error
    }
}

function mapDispatchToProps(dispatch, ownProps) {

    return {
        fetchCategory: (category) => dispatch(fetchCategory(category)),
        fetchMyMemes: () => dispatch(fetchMyMemes()),
        fetchWeeklyPopularMemes : () => dispatch(fetchWeeklyPopularMemes()),
        fetchNewMemes : () => dispatch(fetchNewMemes()),
        fetchAllTimePopularMemes: () => dispatch(fetchAllTimePopularMemes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemeSection)
