import React, {FC, PropsWithChildren} from 'react';

import {Outlet} from "react-router-dom";
import {Header} from "../components";
import {SideBar} from "../components/SideBar";

interface IProps extends  PropsWithChildren{}
const MainLayout:FC<IProps> = () => {
    return (
        <div className="container" >
            <div className="side_bar">
                <SideBar/>
            </div>
            <div className="wrapper">
                <Header/>
                <Outlet />
            </div>


        </div>
    );
};

export  {MainLayout};