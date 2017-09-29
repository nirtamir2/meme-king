import React, { Component } from 'react';

export default class ItemRemover extends Component {

    removeSelectedItem = ()=> {
        const { canvas } = this.props;
        canvas.getActiveObject().remove();
        this.setState({ show: false })

    };

    render(){
        return (
            <div>
                <div className="trash" onClick={this.removeSelectedItem}>
                    <span className="glyphicon glyphicon-trash" />
                </div>)
            </div>
        );
    }
}
