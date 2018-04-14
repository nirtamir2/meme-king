import React from 'react';
import classNames from 'classnames';

// components
import BootstrapPanel from 'react-bootstrap/lib/Panel';

const Panel = ({ className, ...rest }) => {

    return(
        <BootstrapPanel className={classNames('box-panel', className)} {...rest} />
    )
}

Panel.Body = BootstrapPanel.Body;

export default Panel;