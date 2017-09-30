import React, { Component } from 'react';
import classNames from 'classNames';

export default ({ label, icon , onClick, style, htmlFor, wrapWithLabel }) => {

    if (wrapWithLabel) {
        return(
            <label htmlFor={htmlFor} className={classNames('flex box-generator-button', style)} onClick={onClick}>
                {icon && <span className={icon}/> }
                <span>{label}</span>
            </label>
        )
    }

    return(
        <a htmlFor={htmlFor} className={classNames('flex box-generator-button', style)} onClick={onClick}>
            {icon && <span className={icon}/> }
            <span>{label}</span>
        </a>
    )
}