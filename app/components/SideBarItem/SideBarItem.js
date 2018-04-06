import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// components
import Avatar from 'components/Avatar/Avatar';
import Title from 'components/Title/Title';

export default ({ title, linkText, onClick, icon, path, style }) => (
    <Link onClick={onClick} to={path}>
        <li className={classNames('menu-item', style)}>
            <Title size="h4">{linkText} </Title>
            <Avatar size="xxs" imgSrc={icon}/>
        </li>
    </Link>
)