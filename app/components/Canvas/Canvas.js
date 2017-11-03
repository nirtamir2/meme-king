import _ from 'lodash';
import React, { Component } from 'react';
import classNames from 'classnames'

class Canvas extends Component {

    getHeight = () => {
        return _.get(this.canvasWrapper, 'offsetHeight');
    }

    render() {
        const { isCanvasReady,  isLoading } = this.props;

        return (
            <div ref={node => this.canvasWrapper = node} className={classNames({ 'with-shadow': isCanvasReady }, 'generator__canvas-wrapper col-md-12 col-lg-7')}>
                <canvas height="1" id='c' dir="rtl" className={classNames({ 'loading' : isLoading })}/>
                {isLoading && <div className="skeleton-canvas" />}
            </div>
        )
    }

}




export default Canvas;