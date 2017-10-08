import isMobile from './isMobile';
import getTextPosition from './getTextPosition';
import uniqueId from './uniqueId';
import isRTL from './isRtl';
import modifyImageDimensions from './modifyImageDimensions';
import getDataUri from './getDataUri';
import getRandomNumber from './getRandomNumber';
import isWebview from './isWebview';

class Helpers {

    constructor() {
        this.isMobile = isMobile;
        this.getTextPosition = getTextPosition;
        this.uniqueId = uniqueId;
        this.isRTL = isRTL;
        this.modifyImageDimensions = modifyImageDimensions;
        this.getDataUri = getDataUri;
        this.getRandomNumber = getRandomNumber;
        this.isWebview = isWebview;
    }

}


export default new Helpers();