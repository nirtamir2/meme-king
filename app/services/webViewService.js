
class WebViewService {

    constructor() {
        this.isWebView = false;
    }

    setIsWebView = (value) => {
        this.isWebView = value;
    }

    isInsideWebView = () => {
        return this.isWebview;
    }


}


export default new WebViewService()