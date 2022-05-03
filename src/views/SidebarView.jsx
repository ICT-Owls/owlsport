import { React } from 'react';
import { IconButton, Divider, Button } from '@mui/material';
import PropTypes from 'prop-types';
import SignInView from './SignInView';
import { Link } from 'react-router-dom';

export default function SidebarView({
    openLogin,
    handleLoginOpen,
    handleLoginClose,
    isLoggedIn,
    setIsLoggedIn,
}) {
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if necessary)
    return (
        <>
            <div className="sidebar">
                <IconButton
                    href="/test"
                    color="secondary"
                    aria-label="Search"
                    component="span"
                >
                    <Link to="/">
                        <img src="Solid_Logotype.png" className="h-10" alt="" />
                    </Link>
                </IconButton>

                <div className="sidebar_first">
                    <div className="flex flex-col justify-start child:p-4 child:text-xl">
                        <Button color="primary" href="/events">
                            Events
                        </Button>
                        <Button color="primary" href="/about">
                            About
                        </Button>
                        <Button
                            color="primary"
                            href="/whatever"
                            className="mb-0"
                        >
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
                                    onClick={() => handleLoginOpen(true)}
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
            <SignInView
                handleClose={() => handleLoginClose}
                showMe={openLogin}
            />
        </>
    );
}

SidebarView.propTypes = {
    isLoggedIn: PropTypes.bool,
};
