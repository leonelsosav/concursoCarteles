import React from 'react';
import Sidebar from '../components/UI/Sidebar'
import TopBar from '../components/UI/TopBar'
import DataTable from 'react-data-table-component';

const Dashboard = () => {

    return (
        <>
            <Sidebar></Sidebar>
            <TopBar titulo="Dashboard"></TopBar>
            <div className="workSpace">
                
            </div>
        </>
    )
};

export default Dashboard;