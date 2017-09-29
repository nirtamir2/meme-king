import isMobile from './isMobile';
import getTextPosition from './getTextPosition';
import uniqueId from './uniqueId';

class Helpers {

    constructor() {
        this.isMobile = isMobile;
        this.getTextPosition = getTextPosition;
        this.uniqueId = uniqueId;
    }

}


export default new Helpers();