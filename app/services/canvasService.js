
 class CanvasService {

    constructor(){
        this.canvas = null;
    }

    init(canvas) {
        this.canvas = canvas;
        this.bindEvents()
    }

    get() {
        return this.canvas;
    }

    bindEvents() {
        this.canvas.on('mouse:down', function() {
            document.querySelector(".generator").style.overflow = 'visible';
            document.querySelector("body").style.overflow = 'visible';

        });
        this.canvas.on('mouse:up', function() {
            document.querySelector(".generator").style.overflow = 'scroll';
            document.querySelector("body").style.overflow = 'scroll';

        });
    }


}

export default new CanvasService();