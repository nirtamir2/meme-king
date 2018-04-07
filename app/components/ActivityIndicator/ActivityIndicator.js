import React from 'react';
import classNames from 'classnames';

const ActivityIndicator = ({ className }) => (
    <div id="activity-indicator" className={classNames('box-activity-indicator', className)}/>
)

export default ActivityIndicator;