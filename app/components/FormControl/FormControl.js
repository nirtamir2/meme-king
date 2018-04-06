import React from 'react';
import classNames from 'classnames';

// components
import BootstrapFormControl from 'react-bootstrap/lib/FormControl';


const FormControl = ({ className, theme, ...rest }) => (
    <BootstrapFormControl className={classNames('box-form-control', `theme-${theme}`,  className)} {...rest}/>
)

FormControl.defaultProps = {
    theme: 'default'
}

export default FormControl;