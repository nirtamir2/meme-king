import React from 'react'

const Spinner = ({ type }) => {

    switch(type) {

        case 'round-empty': {
            return(
                <div className="box-round-empty-loader">
                    <div>
                        <div className="round-loader"/>
                    </div>
                    <div className="load-text">
                    </div>
                </div>
            )
        }
    }
}


Spinner.defaultProps = {
    type: 'round-empty'
}

export default Spinner;