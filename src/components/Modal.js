import React from 'react';

function Modal(props) {
    return (
        <div className="modal-bg-overlay" onClick={() => props.setNewModalOpen(false)}>
            <div onClick={(e) => e.stopPropagation()} className="modal">
                <h3>{props.header}</h3>
                <div className="modal-body">
                    {props.bodyContent}
                </div>
            </div>
        </div>
    )
}

export default Modal;