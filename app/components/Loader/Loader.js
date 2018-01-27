import React from 'react'
import classNames from  'classnames';

const Spinner = ({ type, className }) => {

    switch(type) {

        case 'round-empty': {
            return(
                <div className={classNames('box-round-empty-loader', className)}>
                    <div>
                        <div className="round-loader"/>
                    </div>
                    <div className="load-text">
                    </div>
                </div>
            )
        }
        case 'spinner': {
            return(
                <div className="spinner"/>
            )
        }
    }
}


Spinner.defaultProps = {
    type: 'round-empty'
}

export default Spinner;