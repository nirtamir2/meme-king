import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

// actions
import { toggleSideBar } from '../../actions/index';

export class Header extends Component {

    render(){
        const { toggleSideBar, isSideBarOpen, currentCategory } = this.props;
        const hamburgerToggleClass = isSideBarOpen ? 'open' : '';

        return (
            <header className="visible-xs">
                <span className={classNames(hamburgerToggleClass, 'hamburger')} onClick={() => toggleSideBar(!isSideBarOpen) }>
                    <span/>
                    <span/>
                    <span/>
                </span>
                <h1>{currentCategory}</h1>
            </header>
        )
    }
}


function mapStateToProps(state) {
    return {
        isSideBarOpen: state.isSideBarOpen,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleSideBar }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)