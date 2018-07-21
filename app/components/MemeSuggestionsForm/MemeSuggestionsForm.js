import React from 'react';

// services
import AnalyticsService from 'services/Analytics';


class MemeSuggestionsForm extends React.Component {

    componentDidMount() {
        AnalyticsService.sendEvent('visited user meme suggestions form');
    };


    render() {
        return (
            <div>
                <iframe src="http://upload-meme.surge.sh/" style={{ overflow: 'hidden', height: '100vh', width: '100%' }} />
            </div>
        )
    }
}

export default MemeSuggestionsForm;