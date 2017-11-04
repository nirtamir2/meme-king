import React from 'react';
import classNames from 'classnames';
import GeneratorModal from 'components/GeneratorModal/GeneratorModal'

// components
import Modal from 'react-bootstrap/lib/Modal';

export default ({ children, show, className, onHide }) => (
    <Modal className={classNames("memeking-modal",className)} show={show} onHide={onHide} >
        <Modal.Body >
            {children}
        </Modal.Body>
    </Modal>
)