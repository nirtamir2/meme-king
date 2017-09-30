import React from 'react';
import { Link } from 'react-router-dom';

export default ({ title, linkText, onClick, icon, path, style }) => (
    <div>
        <Link to={path}>
            <li className={`menu-item ${style}`}>
                <span>{linkText} </span>
                <img src={icon}/>
            </li>
        </Link>
    </div>
)