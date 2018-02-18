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
import Tooltip from 'components/Tooltip/Tooltip';

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
                             onClick={this.openCollageGenerator}
                             className="open-generator"
                             size="xl" t
                             theme="pink"
                             name={'NEW_WINDOW'}
                         />
                     )}
                     {(collageMemeAmount > 1) && (
                         <Icon
                             onClick={this.props.resetCollageMemes}
                             className="clean-collage"
                             size="xl"
                             theme="pink"
                             name="TRASH"/>
                     )}
                </span>
                <Tooltip text="קולאז׳" placement="bottom">
                <span onClick={setCollageMode} className={classNames('inner-switcher', { 'active': isCollageMode })}>
                    <div className={classNames('pull-left collage-icon',)}>
                        <Icon name="IMAGES" theme={helpers.isMobile() ?  (isCollageMode ? 'pink' : 'white') : 'pink'} />
                    </div>
                </span>
                </Tooltip>
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