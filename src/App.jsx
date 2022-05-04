import SidebarPresenter from './presenters/SidebarPresenter';
import NavbarPresenter from './presenters/NavbarPresenter';
import ChatsPresenter from './presenters/ChatsPresenter';
import MainContentPresenter from './presenters/MainContentPresenter';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { LightTheme, DarkTheme } from './Themes';
import './App.css';
import React from 'react';
import { Box } from '@mui/material';
import { EventCreatingPresenter } from './presenters/EventCreatingPresenter';

const userObject = {};
//export userObject

function App() {
    const [lightmode, ] = React.useState(true);
    return (
        <ThemeProvider theme={lightmode ? LightTheme : DarkTheme}>
            <div className="flex absolute justify-start w-screen h-screen App">
                <Box
                    className="bg-background"
                    sx={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <NavbarPresenter />
                    <SidebarPresenter isLoggedIn={userObject.isLoggedIn} />
                    <ChatsPresenter />
                    <EventCreatingPresenter/>
                    <MainContentPresenter />
                </Box>
            </div>
        </ThemeProvider>
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
