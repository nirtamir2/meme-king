import React from 'react';
import classNames from 'classnames';

// components
import Modal from 'react-bootstrap/lib/Modal';

export default ({ children, show, className, onHide }) => (
    <Modal className={classNames("memeking-modal",className)} show={show} onHide={onHide} >
        <Modal.Header closeButton />
        <Modal.Body >
            {children}
        </Modal.Body>
    </Modal>
)