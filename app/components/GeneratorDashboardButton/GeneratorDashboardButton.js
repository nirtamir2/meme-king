import React, { Component } from 'react'
import classNames from 'classNames'

// components
import Icon from 'components/Icon/Icon'

export default ({ label, icon, onClick, style, htmlFor, wrapWithLabel, className }) => {

    const markUp = (
        <div className="flex">
            {icon && <Icon name={icon}/> }
            <span className="text hidden-mobile hidden-sm hidden-xs ">{label}</span>
        </div>
    );

    const mobileLabel = (<span className="text visible-mobile">{label}</span>);

    const props = {
        htmlFor: htmlFor,
        className: classNames('flex box-generator-button', style, className),
        onClick: onClick
    }

    if (wrapWithLabel) {
        return (
            <div>
                <label {...props} >
                    {markUp}
                </label>
                {mobileLabel}
            </div>
        )
    }

    return (
        <div>
            <a {...props}>
                {markUp}
            </a>
            {mobileLabel}
        </div>
    )
}