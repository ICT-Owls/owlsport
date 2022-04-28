import Button from '@mui/material/Button';
import SidebarPresenter from './presenters/SidebarPresenter';
import NavbarPresenter from './presenters/NavbarPresenter';
import ChatsPresenter from './presenters/ChatsPresenter';
import MainContentPresenter from './presenters/MainContentPresenter';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { LightTheme, DarkTheme } from './Themes';
import './App.css';
import React from 'react';
import { Box } from '@mui/material';

function App() {
    const [lightmode, setLightmode] = React.useState(true);
    return (
        <ThemeProvider theme={lightmode ? LightTheme : DarkTheme}>
            <div className="App absolute w-screen h-screen flex justify-start">
                <Box
                    className="bg-background"
                    sx={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <NavbarPresenter />
                    <ChatsPresenter />
                    <MainContentPresenter />
                </Box>
            </div>
        </ThemeProvider>
    );
}

export default App;

// import Button from '@mui/material/Button';
// import './App.css';
// import SidebarPresenter from './presenters/SidebarPresenter';
// import NavbarPresenter from './presenters/NavbarPresenter';
// import ChatsPresenter from './presenters/ChatsPresenter';
// import MainContentPresenter from './presenters/MainContentPresenter';
// import {BrowserRouter, Route, Routes} from "react-router-dom";

// function Events() {
//     return (
//         <>
//             <h1>EVENTS PAGE</h1>
//             <SidebarPresenter/>
//             <NavbarPresenter/>
//             <ChatsPresenter />
//             <MainContentPresenter />
//         </>
//     );
// }

// function About() {
//     return (
//         <>
//             <h1>ABOUT PAGE</h1>
//             <SidebarPresenter/>
//             <NavbarPresenter/>
//             <ChatsPresenter />
//             <MainContentPresenter />
//         </>
//     );
// }

// function Whatever() {
//     return (
//         <>
//             <h1>WHATEVER PAGE</h1>
//             <SidebarPresenter/>
//             <NavbarPresenter/>
//             <ChatsPresenter />
//             <MainContentPresenter />
//         </>
//     );
// }

// function Login() {
//     return (
//         <>
//             <h1>LOGIN PAGE</h1>
//             <SidebarPresenter/>
//             <NavbarPresenter/>
//             <ChatsPresenter />
//             <MainContentPresenter />
//         </>
//     );
// }

// function Signup() {
//     return (
//         <>
//             <h1>SIGNUP PAGE</h1>
//             <SidebarPresenter/>
//             <NavbarPresenter/>
//             <ChatsPresenter />
//             <MainContentPresenter />
//         </>
//     );
// }

// function Home() {
//     return (
//         <>
//             <div className="App">
//                 <Button variant="contained">Look, an MUI button!</Button>
//                 <SidebarPresenter />
//                 <NavbarPresenter />
//                 <ChatsPresenter />
//                 <MainContentPresenter />
//             </div>
//         </>
//     );
// }

// function App() {
//     return (
//         <BrowserRouter>
//             <div className="App">

//                 {/* A <Switch> looks through its children <Route>s and
//             renders the first one that matches the current URL.*/}
//                 <Routes>
//                     <Route exact path="/" element={<Home/>}>
//                         <Route exact path="/" element={<Home/>} />
//                     </Route>
//                     <Route path="/events" element={<Events/>}>
//                         <Route path="/events" element={<Events/>} />
//                     </Route>
//                     <Route path="/about" element={<About/>}>
//                         <Route path="/about" element={<About/>} />
//                     </Route>
//                     <Route path="/whatever" element={<Whatever/>}>
//                         <Route path="/whatever" element={<Whatever/>} />
//                     </Route>
//                     <Route path="/login" element={<Login/>}>
//                         <Route path="/login" element={<Login/>} />
//                     </Route>
//                     <Route path="/signup" element={<Signup/>}>
//                         <Route path="/signup" element={<Signup/>} />
//                     </Route>
//                 </Routes>

//             </div>
//         </BrowserRouter>
//     );
// }

// export default App;
