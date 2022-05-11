/*  Presenters  */
import SidebarPresenter from './presenters/SidebarPresenter';
import NavbarPresenter from './presenters/NavbarPresenter';
import ChatsPresenter from './presenters/ChatsPresenter';
import MainContentPresenter from './presenters/MainContentPresenter';
import EventDetailsPresenter from './presenters/EventDetailsPresenter';
import { EventCreatingPresenter } from './presenters/EventCreatingPresenter';
import ParticipantSelectorPresenter from './presenters/ParticipantSelectorPresenter';

import ThemeProvider from '@mui/material/styles/ThemeProvider';

import { StyledEngineProvider } from '@mui/material/styles';
import { Box, Dialog } from '@mui/material';

import { LightTheme, DarkTheme } from './Themes';
import './App.css';
import React, { useEffect } from 'react';
import { subscribeToLogin } from './helpers/Firebase';

import { useEffect, useState, useLayoutEffect } from 'react';
import { auth } from './helpers/Firebase';
import { initModel, useUser } from './models/Model';

export default function App() {
    //Initalize model
    useLayoutEffect(() => initModel(), []);
    const [lightmode] = React.useState(true);
    const [user] = useUser();

    //logs if current user changes
    useEffect(() => {
        console.log('Current User Object: ', user);
    }, [user]);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={lightmode ? LightTheme : DarkTheme}>
                <div className="App absolute flex h-full w-full flex-col justify-start bg-background-200 ">
                    <NavbarPresenter />
                    <div className="mt-20 flex w-full flex-row content-center justify-center">
                        <SidebarPresenter user={user} />
                        <MainContentPresenter user={user} />
                    </div>
                </div>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
