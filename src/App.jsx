import SidebarPresenter from './presenters/SidebarPresenter';
import NavbarPresenter from './presenters/NavbarPresenter';
import ChatsPresenter from './presenters/ChatsPresenter';
import MainContentPresenter from './presenters/MainContentPresenter';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { StyledEngineProvider } from '@mui/material/styles';
import { LightTheme, DarkTheme } from './Themes';
import './App.css';
import React from 'react';
import { Box, Dialog } from '@mui/material';
import { EventCreatingPresenter } from './presenters/EventCreatingPresenter';
import ParticipantSelectorPresenter from './presenters/ParticipantSelectorPresenter';

const userObject = {};
//export userObject

function App() {
    const [lightmode] = React.useState(true);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={lightmode ? LightTheme : DarkTheme}>
                <div className="App absolute flex h-screen w-screen justify-start">
                    <Box
                        className="bg-background-200"
                        sx={{
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <NavbarPresenter />
                        <SidebarPresenter isLoggedIn={userObject.isLoggedIn} />
                        <ChatsPresenter />
                        <EventCreatingPresenter />
                        <MainContentPresenter />
                        <Dialog open={true} fullWidth={true}>
                            <ParticipantSelectorPresenter
                                buttonText="Submit"
                                placeholderText="Type in email address"
                            />
                        </Dialog>
                    </Box>
                </div>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
