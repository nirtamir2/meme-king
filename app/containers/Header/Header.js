import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { withRouter } from 'react-router';

// actions
import { toggleSideBar } from '../../actions/sidebar-actions/sidebar-actions';

// components
import CollageSwitcher from 'containers/CollageSwitcher/CollageSwitcher';

export class Header extends Component {

    render(){
        const { toggleSideBar, isSideBarOpen, isCollageMode, isMemeSection } = this.props;

        const hamburgerToggleClass = isSideBarOpen ? 'open' : '';

        return (
            <header className={classNames({ 'collage-mode': isCollageMode })}>
                <span className={classNames(hamburgerToggleClass, 'hamburger')} onClick={() => toggleSideBar(!isSideBarOpen) }>
                    <span/>
                    <span/>
                    <span/>
                </span>
                {isMemeSection && <CollageSwitcher />}
            </header>
        )
    }
}


function mapStateToProps(state, ownProps) {
    const isMemeSection = _.includes(_.get(ownProps, 'location.pathname'), 'memes')

    return {
        isSideBarOpen: state.isSideBarOpen,
        categoryName: _.get( state, 'category.name'),
        isCollageMode: _.get(state, 'collage.isCollageMode'),
        isMemeSection
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleSideBar }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))