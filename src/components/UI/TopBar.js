import React from 'react';
import '../Style/topbar.css';
const TopBar = ({titulo}) => {
    return (
        <>
            <div className="topBar">
                <p className="tituloTopBar">{titulo}</p>
            </div>
        </>);
};

export default TopBar;
