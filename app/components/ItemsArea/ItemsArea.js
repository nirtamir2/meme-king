import _ from 'lodash';
import React, { Component } from 'react';

import items from './items';

// helpers
import helpers  from 'helpers/helpers';

// components
import ItemRemover from '../ItemsRemover/ItemRemover';

export default class ItemsArea extends Component {

    state = {
        items : items
    }

    addItem = (event) => {
        const src = event.target.src;
        const { canvas } = this.props;
        const self= this;
        fabric.Image.fromURL(src, (image) => {
            image = helpers.modifyImageDimensions(image, 120, 120);
            image.left = canvas.width / 2;
            image.top = canvas.height / 2;
            canvas.add(image);
            image.lockSkewingX = false;
            image.lockSkewingY = false;
            self.bringAllTextForward()
        });

    };

    bringAllTextForward = () => {
        const { canvas } = this.props;
        for(var i = 0; i < canvas.getObjects().length; i++){
            if(canvas.getObjects()[i].text ){
                if(  canvas.getObjects()[i].text.length > 1){
                    if(canvas.getObjects()[i]._stroke === '#fff'){
                        canvas.getObjects()[i].bringToFront();
                    }
                }
            }
        }
    };


    clearSelectedItem(){
        if(this.props.canvas.getActiveObject()){
            this.props.canvas.getActiveObject().remove();
        }
    };
    
    render(){
        return (
            <div className="items_area">
                <div className="items_wrapper">
                    <ItemRemover canvas={this.props.canvas}/>
                    { _.map(this.state.items, (item) => <div key={_.uniqueId()}><img onClick={this.addItem} src={item.file} /></div>)}
                </div>
            </div>
        );
    }
}