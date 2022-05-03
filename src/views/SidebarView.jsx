import { React, useState } from 'react';
import {
    IconButton,
    ListItemText,
    MenuItem,
    MenuList,
    Divider,
    Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import { padding } from '@mui/system';

export default function SidebarView(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if necessary)
    return (
        <div className="sidebar">
            <IconButton
                color="secondary"
                aria-label="Search"
                component="span"
                onClick={() => (window.location.pathname = '/')}
            >
                <img src="Solid_Logotype.png" className="h-10" alt="" />
            </IconButton>
            {/*<div className='logo'>*/}
            {/*<img src='Solid_Logotype.png' alt='logo'/>*/}
            {/*</div>*/}

            {/* eslint-disable-next-line tailwindcss/no-custom-classname*/}
            <div className="sidebar_first">
                <div className="flex flex-col justify-start child:text-xl child:p-4">
                    <Button color="primary" href="/events">
                        Events
                    </Button>
                    <Button color="primary" href="/about">
                        About
                    </Button>
                    <Button color="primary" href="/whatever" className="mb-0">
                        Whatever
                    </Button>
                    <Divider style={{ padding: '0px' }} />
                    {isLoggedIn ? (
                        <>
                            <Button color="primary" href="/account">
                                Account
                            </Button>
                            <Button
                                color="primary"
                                href="/whatever"
                                onClick={() => setIsLoggedIn(!isLoggedIn)}
                            >
                                Sign Out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                color="primary"
                                onClick={() => setIsLoggedIn(!isLoggedIn)}
                            >
                                Sign In
                            </Button>
                            <Button
                                color="primary"
                                onClick={() => setIsLoggedIn(!isLoggedIn)}
                            >
                                Create Account
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

SidebarView.propTypes = {
    isLoggedIn: PropTypes.bool,
};
