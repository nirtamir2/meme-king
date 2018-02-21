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
        const { toggleSideBar, isSideBarOpen, isCollageMode, isMemeSection, categoryName } = this.props;

        const hamburgerToggleClass = isSideBarOpen ? 'open' : '';

        return (
            <header>
                <span className={classNames(hamburgerToggleClass, 'hamburger')} onClick={() => toggleSideBar(!isSideBarOpen) }>
                    <span/>
                    <span/>
                    <span/>
                </span>
                {isMemeSection && <CollageSwitcher category={categoryName} />}
            </header>
        )
    }
}


function mapStateToProps(state) {
    const isMemeSection = _.includes(window.location.href, 'memes')

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))