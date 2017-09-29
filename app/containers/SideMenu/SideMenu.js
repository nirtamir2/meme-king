import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import { toggleSideBar } from 'actions/index';

// components
import MenuItem from "components/SideBarItem/SideBarItem";

// constants
import menu from 'constants/menu';


export class SideMenu extends Component {

    onClose = () => {
        this.props.toggleSideBar(false)
    };


    render = () => {

        const { isSideBarOpen } = this.props;

        const { onClose } = this;

        const visibleMenu = _.filter({...menu}, item => item.visible);

        return (
            <div className="sidebar">
                <ul>
                    {_.map(visibleMenu, menuItem => {

                        const { title, path, linkText, icon } = menuItem;

                        return (
                            <MenuItem onClick={onClose}
                                      title={title}
                                      path={path}
                                      linkText={linkText || title}
                                      icon={icon}
                            />
                        )
                        })
                    }
                </ul>

            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)