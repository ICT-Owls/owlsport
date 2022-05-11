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
                <div className="App absolute flex h-full w-full flex-col justify-start"
                     style={{backgroundImage: `url('../background.png')`, backgroundRepeat: 'no-repeat',
                         width:'100hv', height: 'auto',
                         backgroundPosition: 'left', backgroundSize: 'cover', backgroundAttachment: "fixed"}}>

                    <NavbarPresenter />

                    <Box sx={{ marginX: 'auto', minHeight: '1200px', height: '100%', maxWidth: '1200px', width:'100%',
                        }}>
                        <div className="pt-10 h-screen w-full content-center justify-center flex flex-row space-x-0">
                            <SidebarPresenter className=' ' user={user} />
                            <MainContentPresenter className=' ' user={user} />
                        </div>
                    </Box>

                    {/*<Box sx={{ marginX: 'auto', minHeight: '1200px', height: '100%', maxWidth: '1200px', width:'100%',*/}
                    {/*    alignItem: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>*/}
                    {/*    <div className="pt-10 h-screen w-full content-center justify-center flex flex-row">*/}
                    {/*        <SidebarPresenter className=' ' user={user} />*/}
                    {/*        <MainContentPresenter className='' user={user} />*/}
                    {/*    </div>*/}
                    {/*</Box>*/}



                </div>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
