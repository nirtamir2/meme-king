import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export default ({ title, linkText, onClick, icon, path, style }) => (
    <div>
        <Link onClick={onClick} to={path}>
            <li className={classNames('menu-item', style)}>
                <span>{linkText} </span>
                <img src={icon}/>
            </li>
        </Link>
    </div>
)