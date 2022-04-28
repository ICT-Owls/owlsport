import Button from '@mui/material/Button';
import React from 'react';

import logo from './logo.svg';
import './App.css';
import SidebarPresenter from './presenters/SidebarPresenter';
import NavbarPresenter from './presenters/NavbarPresenter';
import ChatsPresenter from './presenters/ChatsPresenter';
import MainContentPresenter from './presenters/MainContentPresenter';

function App() {
    return (
        <div className="App">
            <Button variant="contained">Look, an MUI button!</Button>
            <SidebarPresenter />
            <NavbarPresenter />
            <ChatsPresenter />
            <MainContentPresenter />
        </div>
    );
}

export default App;
