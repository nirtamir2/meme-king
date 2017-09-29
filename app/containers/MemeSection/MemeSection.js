import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// actions
import { fetchMyMemes, fetchCategory, fetchWeeklyPopularMemes, fetchNewMemes } from 'actions/data-actions/data-actions';

// components
import MemeThumb from 'components/MemeThumb/MemeThumb'
import BtnScrollToTop from '../../components/BtnScrollToTop/BtnScrollToTop';
import Loader from 'components/Loader/Loader';
import MemeSectionBar from 'components/MemeSectionBar/MemeSectionBar';
import EmptyState from 'components/EmptyState/EmptyState';

 class MemeSection extends Component {

     state = {
         memesPerRow : 8
     }

    componentWillMount(){
        this.loadData(this.props.category)
    };

    componentWillReceiveProps(nextProps){
        BtnScrollToTop.scrollToTop();
        if(this.props.category !== nextProps.category) {
            this.loadData(nextProps.category);
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

        if(isFetching){
            return <Loader />
        }

        else if (_.isEmpty(memes)) {
            return (
                <EmptyState />
            )
        }

        return (
            <div>
                <MemeSectionBar setMemesPerRow={this.setMemesPerRow} />
                <div className="memes-container">
                    {_.map(memes, meme =>
                        <MemeThumb
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
        fetchNewMemes : () => dispatch(fetchNewMemes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemeSection)
