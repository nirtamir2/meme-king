import _ from 'lodash';
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom';

// actions
import {fetchSearchResults, cleanSearchResults} from 'actions/search-actions/search-actions'

// components
import AutoComplete from 'components/AutoComplete/AutoComplete';
import Text from 'components/Text/Text';
import Avatar from 'components/Avatar/Avatar';

// constants
import globalConstants from 'constants/global'

// helpers
import helpers from 'helpers/helpers';

class Searcher extends Component {

    state = {
        value: ''
    }

    clearResults = () => {
        this.setState({ active: false, value: '' })
        this.props.cleanSearchResults()
    }

    openGenerator = (meme) => {
        const { history } = this.props;
        history.push(`/generator/search/${meme.id}/${globalConstants.format.normal}`);
    };

    loadOptions = (input, callback) => {

        if (!input) {
            callback();
            return
        }

        if (input.length >= 3) {
            this.props.fetchSearchResults(input).then(() => {
                callback(null, { options:  _.map(this.props.searchResults, meme =>  _.assign({}, { label: meme.description }, meme)) });
            });
        }
    };

    getSearchResultComponent = ({ option }) => {
        return (
            <div onClick={() => this.openGenerator(option)} className="clearfix search-result-component">
                <Avatar size="sm" imgSrc={option.thumbPath} className="pull-left margin-top-extra-small" />
                <Text size="md" theme="black" className="pull-right margin-top-small">
                    {_.truncate(option.description, { length: helpers.isMobile() ? 20 : 40})}
                </Text>
            </div>
        )
    }

    render() {

        return (
            <AutoComplete.Async
                id="state-select"
                loadOptions={this.loadOptions}
                name="selected-state"
                placeholder="חיפוש"
                searchPromptText="חיפוש מימ לפי מילת מפתח"
                noResultsText="לא נמצאו ממים מתאימים"
                loadingPlaceholder="מחפש ממים מתאימים..."
                className="box-searcher"
                clearable={true}
                onBlurResetsInput={false}
                value={this.state.value}
                onChange={(value) => this.setState({ value })}
                optionComponent={this.getSearchResultComponent}
            />
        )

    }
}

function mapStateToProps(state, ownProps) {

    return {
        searchResults: state.search.searchResults,
        isFetching: state.search.isFetching,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchSearchResults, cleanSearchResults }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Searcher))