/*  Presenters  */
import { StyledEngineProvider } from '@mui/material/styles';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import React, { useEffect, useLayoutEffect } from 'react';
import './App.css';
import { initModel, useUser } from './models/Model';
import MainContentPresenter from './presenters/MainContentPresenter';
import NavbarPresenter from './presenters/NavbarPresenter';
import SidebarPresenter from './presenters/SidebarPresenter';
import { DarkTheme, LightTheme } from './Themes';

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
