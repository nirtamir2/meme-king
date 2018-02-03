import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// actions
import { fetchMemeSuggestions } from 'actions/suggestions-actions/suggestions-actions';
import { addMemeToCategory } from 'actions/category-actions/category-actions';
// components
import MemeThumb from 'components/MemeThumb/MemeThumb';
import Row from 'react-bootstrap/lib/Row';
import Label from 'components/Label/Label'

// helpers
import helpers from 'helpers/helpers';

// services
import AnalyticsService from 'services/Analytics';


class MemeSuggestionsContainer extends Component {


    openGenerator = (e, meme) => {
        e.preventDefault();

        AnalyticsService.sendEvent('Similar Memes Clicked');
        const { category: backgroundCategory, format } = _.get(this.props, 'match.params', {})
        this.props.addMemeToCategory(meme)
        const location = {
            pathname:  `/memes/${backgroundCategory}/generator/${meme.id}/${format || 'normalFormat'}`,

        }

        this.props.history.push(location)
    };

    render() {

        const { suggestions, isFetching } = this.props;

        //
        // if((_.isEmpty(suggestions))) {
        //     return null;
        // }
        //
        // if(isFetching) {
        //     return (
        //         <Row className="box-meme-suggestions-container margin-top-medium text-center fetching">
        //             <Title className="margin-top-none" size="h2" align="center">
        //                 טוען ממים דומים...
        //             </Title>
        //         </Row>
        //         )
        // }

        return(

                <Row className="box-meme-suggestions-container margin-top-medium">
                    <Label size={helpers.isMobile() ? 'sm' : 'md'} theme="default">
                        ממים דומים
                    </Label>
                    {_.map(suggestions, (meme) =>
                        <MemeThumb width={helpers.isMobile() ? 33 : 12.5}
                                   key={meme.id}
                                   {...meme}
                                    onClick={e => this.openGenerator(e, meme)}
                                   className="margin-right-tiny margin-left-tiny"
                        />
                    )}
                </Row>
        )
    }

}

export default withRouter(connect(null, { addMemeToCategory })(MemeSuggestionsContainer));