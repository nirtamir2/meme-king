import React, { Component } from 'react';
import classNames from 'classnames';

import Icon from 'components/Icon/Icon';

class MemeTextFieldButton extends Component {

    render() {

        const { icon, text, onClick, className, activeClassName } = this.props;

        return(
            <div className={classNames(className , 'text-control__btn')} onClick={onClick}>
                {icon ? <Icon name={icon}/> : text}
            </div>
        )
    }
}

export default MemeTextFieldButton;