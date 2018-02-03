import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import classNames from 'classnames'

// actions
import { setCollageMode, resetCollageMemes } from 'actions/collage-actions/collage-actions'

// services
import AnalyticsService from 'services/Analytics'

// assets
import collageIcon from 'assets/images/collage.png'

// components
import Text from 'components/Text/Text';
import Icon from 'components/Icon/Icon';

// helpers
import helpers from 'helpers/helpers';

class CollageSwitcher extends React.Component {

    openCollageGenerator = () => {

        this.props.history.push(`/memes/${_.get(this.props, 'match.params.category', this.props.category)}/generator-collage`);
    }

    render() {

        const { isCollageMode, setCollageMode, collageMemeAmount, className } = this.props

        return (
            <div className={classNames('box-collage-switcher margin-left-small pull-left', className)}>
                <span className={classNames('switcher-cta', { 'is-visible': (collageMemeAmount > 1) })}>
                     {(collageMemeAmount > 1) && (
                         <Icon
                             onClick={this.props.resetCollageMemes}
                             className="margin-right-small clean-collage"
                             size="xl"
                             theme="white"
                             name="TRASH"/>
                     )}
                    {(collageMemeAmount > 1) && (
                        <Icon
                            onClick={this.openCollageGenerator}
                            className="margin-right-small open-generator"
                            size="xl" t
                            theme="white"
                            name={helpers.isMobile() ? 'NEW_WINDOW': 'ARROW_LEFT_CIRCLE'}
                        />
                    )}

                </span>
                <span onClick={setCollageMode} className={classNames('inner-switcher', { 'active': isCollageMode })}>

                    <div className={classNames('pull-left collage-icon',)}>
                        <img src={collageIcon}/>
                    </div>
                    <div className="text-container">
                        <Text
                            size={'sm'}
                            weight={400}
                            inline
                            theme={helpers.isMobile() && !isCollageMode ? 'white' : 'pink'}
                            className={classNames('pull-left margin-bottom-none margin-right-tiny collage-label')}
                        >
                            קולאז׳
                        </Text>


                    </div>
            </span>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isCollageMode: state.collage.isCollageMode,
        collageMemeAmount: _.size(state.collage.memes),
        collageMemeLimit: state.collage.limit,
    }
}


const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        setCollageMode: () =>  {

             AnalyticsService.sendEvent('collage set button clicked');

            return dispatchProps.setCollageMode({ isCollageMode: !stateProps.isCollageMode })
        }

    }
}


export default connect(mapStateToProps, { setCollageMode, resetCollageMemes }, mergeProps)(withRouter(CollageSwitcher))