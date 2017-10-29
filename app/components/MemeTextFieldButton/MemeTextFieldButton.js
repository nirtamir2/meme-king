import React, { Component } from 'react';
import classNames from 'classnames';

class MemeTextFieldButton extends Component {

    render() {

        const { icon, text, onClick, className, activeClassName } = this.props;

        return(
            <div className={classNames(className , 'text-control__btn')} onClick={onClick}>
                {icon ? <span className={icon}/> : text}
            </div>
        )
    }
}

export default MemeTextFieldButton;