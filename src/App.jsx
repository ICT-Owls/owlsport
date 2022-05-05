import SidebarPresenter from './presenters/SidebarPresenter';
import NavbarPresenter from './presenters/NavbarPresenter';
import ChatsPresenter from './presenters/ChatsPresenter';
import MainContentPresenter from './presenters/MainContentPresenter';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { StyledEngineProvider } from '@mui/material/styles';
import { LightTheme, DarkTheme } from './Themes';
import './App.css';
import React from 'react';
import { Box } from '@mui/material';
import { subscribeToLogin } from './helpers/Firebase';
import { useEffect } from 'react';
import { auth } from './helpers/Firebase';

function App() {
    const [lightmode] = React.useState(true);
    const [user, setUser] = React.useState(null);

    useEffect(() => {
        return auth.onAuthStateChanged((e) => setUser(e));
    }, []);

    useEffect(() => {
        console.log('Current User Object: ', user);
    }, [user]);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={lightmode ? LightTheme : DarkTheme}>
                <div className="App absolute flex h-full w-full flex-col justify-start ">
                    <NavbarPresenter />
                    <div className="mt-14 flex">
                        <SidebarPresenter user={user} />
                        <div className="ml-56 flex grow">
                            <ChatsPresenter />
                            <MainContentPresenter />
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

// function Events() {
//     return (
//         <>
//             <h1>EVENTS PAGE</h1>
//             <SidebarPresenter isLoggedIn={userObject.isLoggedIn} />
//             <NavbarPresenter />
//             <ChatsPresenter />
//             <MainContentPresenter />
//         </>
//     );
// }

// function About() {
//     return (
//         <>
//             <h1>ABOUT PAGE</h1>
//             <SidebarPresenter isLoggedIn={userObject.isLoggedIn} />
//             <NavbarPresenter />
//             <ChatsPresenter />
//             <MainContentPresenter />
//         </>
//     );
// }

// function Whatever() {
//     return (
//         <>
//             <h1>WHATEVER PAGE</h1>
//             <SidebarPresenter isLoggedIn={userObject.isLoggedIn} />
//             <NavbarPresenter />
//             <ChatsPresenter />
//             <MainContentPresenter />
//         </>
//     );
// }

// function Login() {
//     userObject.isLoggedIn = true;
//     return (
//         <>
//             <h1>LOGIN PAGE</h1>
//             <SidebarPresenter isLoggedIn={userObject.isLoggedIn} />
//             <NavbarPresenter />
//             <ChatsPresenter />
//             <MainContentPresenter />
//         </>
//     );
// }

// function Signup() {
//     return (
//         <>
//             <h1>SIGNUP PAGE</h1>
//             <SidebarPresenter isLoggedIn={userObject.isLoggedIn} />
//             <NavbarPresenter />
//             <ChatsPresenter />
//             <MainContentPresenter />
//         </>
//     );
// }

// function Logout() {
//     userObject.isLoggedIn = false;
//     return (
//         <>
//             <h1>LOGOUT PAGE</h1>
//             <SidebarPresenter isLoggedIn={userObject.isLoggedIn} />
//             <NavbarPresenter />
//             <ChatsPresenter />
//             <MainContentPresenter />
//         </>
//     );
// }

// function Account() {
//     return (
//         <>
//             <h1>ACCOUNT PAGE</h1>
//             <SidebarPresenter isLoggedIn={userObject.isLoggedIn} />
//             <NavbarPresenter />
//             <ChatsPresenter />
//             <MainContentPresenter />
//         </>
//     );
// }

// function App() {
//     userObject.isLoggedIn = false;

//     return (
//         <BrowserRouter>
//             <div className="App">
//                 {/* A <Switch> looks through its children <Route>s and
//             renders the first one that matches the current URL.*/}
//                 <Routes>
//                     <Route exact path="/" element={<Home />}>
//                         <Route exact path="/" element={<Home />} />
//                     </Route>
//                     <Route path="/events" element={<Events />}>
//                         <Route path="/events" element={<Events />} />
//                     </Route>
//                     <Route path="/about" element={<About />}>
//                         <Route path="/about" element={<About />} />
//                     </Route>
//                     <Route path="/whatever" element={<Whatever />}>
//                         <Route path="/whatever" element={<Whatever />} />
//                     </Route>
//                     <Route path="/login" element={<Login />}>
//                         <Route path="/login" element={<Login />} />
//                     </Route>
//                     <Route path="/signup" element={<Signup />}>
//                         <Route path="/signup" element={<Signup />} />
//                     </Route>
//                     <Route path="/logout" element={<Logout />}>
//                         <Route path="/logout" element={<Logout />} />
//                     </Route>
//                     <Route path="/account" element={<Account />}>
//                         <Route path="/account" element={<Account />} />
//                     </Route>
//                 </Routes>
//             </div>
//         </BrowserRouter>
//     );
// }

export default App;
