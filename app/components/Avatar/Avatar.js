import React, { Component } from 'react';
import classNames from 'classnames';

// assets
import logo from 'assets/images/logo.png';

 class Avatar extends Component {



    render() {
        const { imgSrc, size, isCentered } = this.props;

        return(
            <div className={classNames('box-avatar', `size-${size}`, {'center': isCentered})}>
                <img src={imgSrc} />
            </div>
        )
    }

}

Avatar.defaultProps = {
    imgSrc: logo,
    size: 'md'
}

export default Avatar;