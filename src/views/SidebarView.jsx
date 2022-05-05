import { React } from 'react';
import { IconButton, Divider, Button } from '@mui/material';
import PropTypes from 'prop-types';
import SignInView from './SignInView';
import { Link } from 'react-router-dom';
import CreateAccountPresenter from '../presenters/CreateAccountPresenter';

export default function SidebarView({
    isLoggedIn,
    openLogin,
    openCreate,
    setIsLoggedIn,
    handleLoginVisibility,
    handleCreateVisibility,
    user,
    signOut,
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
                        {user ? (
                            <>
                                <Button color="primary" href="/account">
                                    Account
                                </Button>
                                <Button
                                    color="primary"
                                    href="/whatever"
                                    onClick={() => signOut()}
                                >
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    color="primary"
                                    onClick={() => handleLoginVisibility(true)}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={() => handleCreateVisibility(true)}
                                >
                                    Create Account
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <SignInView
                handleVisibility={handleLoginVisibility}
                showMe={openLogin}
            />
            <CreateAccountPresenter
                handleVisibility={handleCreateVisibility}
                showMe={openCreate}
            />
        </>
    );
}

SidebarView.propTypes = {
    isLoggedIn: PropTypes.bool,
};
