
class WebViewService {

    constructor() {
        this.isWebView = false;
    }

    setIsWebView = (value) => {
        console.log(value, 'set')
        this.isWebView = value;
    }

    isInsideWebView = () => {
        console.log('issss', this.isWebView)
        return this.isWebview;
    }


}


export default new WebViewService()