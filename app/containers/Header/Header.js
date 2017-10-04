import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

// actions
import { toggleSideBar } from '../../actions/sidebar-actions/sidebar-actions';

// constants
import categories from 'constants/menu';

export class Header extends Component {

    render(){
        const { toggleSideBar, isSideBarOpen, categoryName } = this.props;

        const hamburgerToggleClass = isSideBarOpen ? 'open' : '';
        const title = (_.get(categories, `${categoryName}.title` ) ||' מלך הממים');

        return (
            <header className="visible-xs">
                <span className={classNames(hamburgerToggleClass, 'hamburger')} onClick={() => toggleSideBar(!isSideBarOpen) }>
                    <span/>
                    <span/>
                    <span/>
                </span>
                <h1>{title}</h1>
            </header>
        )
    }
}


function mapStateToProps(state, ownProps) {

    return {
        isSideBarOpen: state.isSideBarOpen,
        categoryName: _.get( state, 'category.name')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleSideBar }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)