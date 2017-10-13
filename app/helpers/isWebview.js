import getQueryVariable from './getQueryVariable';

export default (query) => {


    if (query) {
        return getQueryVariable('origin') === 'mobile';
    }


    const userAgent = window.navigator.userAgent.toLowerCase(),
        safari = /safari/.test( userAgent ),
        ios = /iphone|ipod|ipad/.test( userAgent );

    if( ios ) {
        if ( safari ) {
            //browser
        } else if ( !safari ) {
            //webview
            return true;
        };
    } else {
        //not iOS
    };

    return false;
}