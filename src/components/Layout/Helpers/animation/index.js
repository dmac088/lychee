import React from 'react';
import ReactDOM from 'react-dom';
import Velocity from 'velocity-animate';

export const Spinner = () => {
    return (
        <div className="sidebar mb-35">
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
}

export const slide = (container, direction, params = { duration: 500, display:"" }, options) => {
    if(!container) { return }
    const element = ReactDOM.findDOMNode(container);
    if (element === undefined) { return; }
    Velocity(element, direction, params, options);
}
