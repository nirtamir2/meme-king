import AnalyticsService from 'services/Analytics'
import _ from 'lodash';

const sendDownloadedMemeAnalyticsEvent = ({ isMobileApp ,meme, format, isCollageMode }) => {
    if(isMobileApp) {
        AnalyticsService.sendEvent('Mobile App Download');
        return;
    }

    if(isCollageMode) {
        AnalyticsService.sendEvent('Collage Meme Downloaded');
    }

    const textAreas = document.getElementsByTagName('TEXTAREA')
    const description = _.get(meme, 'description');
    let text = `${description || 'User typed text'} : ${_.get(_.head(textAreas), 'value', '')} ${_.get(_.tail(textAreas), 'value', '')}`
    AnalyticsService.sendEvent('Meme Downloaded', `${format}, ${text}`)
    if (format === 'dank') {
        AnalyticsService.sendEvent('Dank', text)
    }
}

export default sendDownloadedMemeAnalyticsEvent;