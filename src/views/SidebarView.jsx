//import {Container} from "postcss";
import React from 'react';
//import {Link} from "@mui/material";
//import {Route, BrowserRouter, Routes} from "react-router-dom";

export default function SidebarView() {
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return (
        <div className="sidebar">
            <div className="logo">
                <img src="Solid_Logotype.png" alt="logo" />
            </div>

            <div className="sidebar_first">
                <ul className="sidebar_ul">
                    <li
                        key="0"
                        onClick={() => (window.location.pathname = '/events')}
                    >
                        <div>Events</div>
                    </li>
                    <li
                        key="1"
                        onClick={() => (window.location.pathname = '/about')}
                    >
                        <div>About Us</div>
                    </li>
                    <li
                        key="2"
                        onClick={() => (window.location.pathname = '/whatever')}
                    >
                        <div>Whatever Else</div>
                    </li>
                </ul>
            </div>

            <div className="sidebar_second">
                <ul className="sidebar_ul">
                    <li
                        key="3"
                        onClick={() => (window.location.pathname = '/login')}
                    >
                        <div>Login</div>
                    </li>
                    <li
                        key="4"
                        onClick={() => (window.location.pathname = '/signup')}
                    >
                        <div>Sign Up</div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
