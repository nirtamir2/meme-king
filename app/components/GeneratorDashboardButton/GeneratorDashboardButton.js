import React, { Component } from 'react';
import classNames from 'classNames';

export default ({ label, icon , onClick, style, htmlFor, wrapWithLabel }) => {

    if (wrapWithLabel) {
        return(
           <div>
               <label htmlFor={htmlFor} className={classNames('flex box-generator-button', style)} onClick={onClick}>
                   {icon && <span className={icon}/> }
                   <span className="text hidden-mobile hidden-sm hidden-xs ">{label}</span>
               </label>
               <span className="text visible-mobile">{label}</span>
           </div>
        )
    }

    return(
        <div>
            <a htmlFor={htmlFor} className={classNames('flex box-generator-button', style)} onClick={onClick}>
                {icon && <span className={icon}/> }
                <span className="text hidden-mobile hidden-sm hidden-xs">{label}</span>
            </a>
            <span className="text visible-mobile">{label}</span>
        </div>
    )
}