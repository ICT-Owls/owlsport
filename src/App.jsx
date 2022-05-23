import { StyledEngineProvider } from '@mui/material/styles';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { GoogleMapsLoader } from 'helpers/Location';
import ChatsPresenter from 'presenters/ChatsPresenter';
import React, { useEffect, useLayoutEffect } from 'react';
import './App.css';
import { initModel, useUser, useChat } from './models/Model';
import MainContentPresenter from './presenters/MainContentPresenter';
import NavbarPresenter from './presenters/NavbarPresenter';
import SidebarPresenter from './presenters/SidebarPresenter';
import { DarkTheme, LightTheme } from './Themes';

export default function App() {
    //Initalize model
    useLayoutEffect(() => initModel(), []);
    const [lightmode] = React.useState(true);
    const [user] = useUser();
    const [chat] = useChat();

    //logs if current user changes
    if (process.env.NODE_ENV == 'development') {
        useEffect(() => {
            console.info('Current User Object: ', user);
        }, [user]);
    }

    return (
        <StyledEngineProvider injectFirst>
            <GoogleMapsLoader>
                <ThemeProvider theme={lightmode ? LightTheme : DarkTheme}>
                    <NavbarPresenter />

                    <div
                        className="App fixed flex h-screen w-screen flex-row justify-center child:mt-20"
                        style={{
                            backgroundImage: `url('../stacked-waves-haikei.svg')`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'left',
                            backgroundSize: 'cover',
                            backgroundAttachment: 'fixed',
                        }}
                    >
                        <SidebarPresenter user={user} />
                        <div className="h-full w-10 bg-gradient-to-r from-sideandmain-100 to-sideandmain-200" />
                        <MainContentPresenter user={user} />
                        {chat && <ChatsPresenter />}
                    </div>
                </ThemeProvider>
            </GoogleMapsLoader>
        </StyledEngineProvider>
    );
}
