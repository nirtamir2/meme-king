import _ from 'lodash';
import React, { Component } from 'react'
import classNames from 'classNames'

// components
import Icon from 'components/Icon/Icon'

export default class GeneratorDashboardButton extends Component {

    state = {
        elementClicked: null
    }

    render() {
        const { label, icon, onClick, style, htmlFor, wrapWithLabel, className } = this.props;

        const properties = {
            htmlFor: htmlFor,
            className: classNames('flex box-generator-button', style, className),
            onClick: () => _.isFunction(onClick) && onClick(this.state.elementClicked)
        }
        const markUp = (
            <div className="flex">
                {icon && <Icon name={icon}/> }
                <span className="text hidden-mobile hidden-sm hidden-xs ">{label}</span>
            </div>
        )

        const mobileLabel = (<span className="text visible-mobile">{label}</span>)



        if (wrapWithLabel) {
            return (
                <label ref={node => {
                    if(!this.state.elementClicked && wrapWithLabel) {
                        this.setState({ elementClicked : node })
                    }
                } } {...properties} >
                    {markUp}
                    {mobileLabel}
                </label>
            )
        }

        return (
            <a ref={node => {
                if(!this.state.elementClicked) {
                    this.setState({ elementClicked : node })
                }
            } }  {...properties}>
                {markUp}
                {mobileLabel}
            </a>
        )
    }
}