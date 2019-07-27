import React from 'react';
import './ProgressDots.css';

const ProgressDots = ({message}) => {
    return (<div className="loading">{message}</div>);
};

export default ProgressDots;
