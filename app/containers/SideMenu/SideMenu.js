import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import { toggleSideBar } from 'actions/sidebar-actions/sidebar-actions';

// components
import MenuItem from "components/SideBarItem/SideBarItem";

// constants
import menu from 'constants/menu';

// helpers
import helpers from 'helpers/helpers';

export class SideMenu extends Component {

    onClose = () => {
       if (helpers.isMobile()) {
           this.props.toggleSideBar(false)
       }
    };

    componentWillReceiveProps(nextProps) {
        if (helpers.isMobile()) {
            const cover = document.querySelector(".cover");
            cover.style.display = nextProps.isSideBarOpen ? 'block' : 'none';
            if (nextProps.isSideBarOpen) {
                cover.onclick = () => nextProps.toggleSideBar(false);
            } else {
                cover.removeEventListener("onClick", () => nextProps.toggleSideBar(false))
            }
        }
    }


    render = () => {

        const { isSideBarOpen } = this.props;

        const { onClose } = this;

        const visibleMenu = _.filter({...menu}, item => item.visible);

        if (!isSideBarOpen) {
            return null;
        }

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
                                      key={_.uniqueId()}
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
        isSideBarOpen: state.isSideBarOpen
   }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleSideBar }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)