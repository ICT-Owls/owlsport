import logo from './logo.svg';
import Button from '@mui/material/Button';
import './App.css';
import SidebarPresenter from './presenters/SidebarPresenter';
import NavbarPresenter from './presenters/NavbarPresenter';
import ChatsView from './views/ChatsView';
import MainContentPresenter from './presenters/MainContentPresenter';
function App() {
    return (
        <div className="App">
            <Button variant="contained">Look, an MUI button!</Button>
            <SidebarPresenter></SidebarPresenter>
            <NavbarPresenter></NavbarPresenter>
            <ChatsView></ChatsView>
            <MainContentPresenter />
        </div>
    );
}

export default App;
