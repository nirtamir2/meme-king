import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

// actions
import { toggleSideBar } from '../../actions/sidebar-actions/sidebar-actions';

// constants
import categories from 'constants/menu';

// components
import CollageSwitcher from 'containers/CollageSwitcher/CollageSwitcher';

export class Header extends Component {

    render(){
        const { toggleSideBar, isSideBarOpen, isCollageMode } = this.props;

        const hamburgerToggleClass = isSideBarOpen ? 'open' : '';

        return (
            <header className={classNames({ 'collage-mode': isCollageMode })}>
                <span className={classNames(hamburgerToggleClass, 'hamburger')} onClick={() => toggleSideBar(!isSideBarOpen) }>
                    <span/>
                    <span/>
                    <span/>
                </span>
                <CollageSwitcher />
            </header>
        )
    }
}


function mapStateToProps(state) {

    return {
        isSideBarOpen: state.isSideBarOpen,
        categoryName: _.get( state, 'category.name'),
        isCollageMode: _.get(state, 'collage.isCollageMode')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleSideBar }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)