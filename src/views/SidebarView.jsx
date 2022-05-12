import { Box, Button, Divider, IconButton, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import CreateAccountPresenter from '../presenters/CreateAccountPresenter';
import AvatarView from './AvatarView';
import SignInView from './SignInView';

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
            <div className="relative h-auto w-60 justify-start  rounded-tl-md rounded-bl-md bg-background-100 bg-opacity-80 text-left">
                <div className="p-8">
                    <IconButton
                        href="/test"
                        color="secondary"
                        aria-label="Search"
                        component="span"
                    >
                        <Link to="/">
                            <img
                                src="Solid_Logotype.png"
                                className="h-6 w-auto"
                                alt=""
                            />
                        </Link>
                    </IconButton>

                    <div className="sidebar_first">
                        <Stack
                            direction="column"
                            alignItems="flex-start"
                            justifyContent="flex-start"
                            className="child:w-full child:p-4 child:text-base"
                        >
                            <Button
                                sx={{ justifyContent: 'left' }}
                                color={'secondary'}
                                href="/events"
                            >
                                Events
                            </Button>
                            <Button
                                sx={{ justifyContent: 'left' }}
                                color="secondary"
                                href="/about"
                            >
                                About
                            </Button>
                            <Button
                                sx={{ justifyContent: 'left' }}
                                color="secondary"
                                href="/whatever"
                                className="mb-0"
                            >
                                Whatever
                            </Button>

                            <Divider style={{ padding: '4px' }} />

                            {user ? (
                                <>
                                    <Box
                                        alignContent={'center'}
                                        width="100%"
                                        maxHeight="56px"
                                    >
                                        <AvatarView
                                            maxHeight="100%"
                                            user={user}
                                        />
                                        Signed in
                                    </Box>
                                    <Button
                                        sx={{ justifyContent: 'left' }}
                                        color="secondary"
                                        href="/account"
                                    >
                                        Account
                                    </Button>
                                    <Button
                                        sx={{ justifyContent: 'left' }}
                                        color="secondary"
                                        href="/whatever"
                                        onClick={() => signOut()}
                                    >
                                        Sign Out
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        sx={{ justifyContent: 'left' }}
                                        color="secondary"
                                        onClick={() =>
                                            handleLoginVisibility(true)
                                        }
                                    >
                                        Sign In
                                    </Button>
                                    <Button
                                        sx={{ justifyContent: 'left' }}
                                        color="secondary"
                                        onClick={() =>
                                            handleCreateVisibility(true)
                                        }
                                    >
                                        Create Account
                                    </Button>
                                </>
                            )}
                        </Stack>
                    </div>
                </div>
            </div>
            <SignInView
                handleVisibility={handleLoginVisibility}
                showMe={openLogin}
            />
            {/*<CreateAccountPresenter
                handleVisibility={handleCreateVisibility}
                showMe={openCreate}
            />*/}
        </>
    );
}

SidebarView.propTypes = {
    isLoggedIn: PropTypes.bool,
};
