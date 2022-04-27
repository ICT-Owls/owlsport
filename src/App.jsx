import logo from "./logo.svg";
import Button from "@mui/material/Button";
import "./App.css";
import SidebarPresenter from "./presenters/SidebarPresenter";
import NavbarPresenter from "./presenters/NavbarPresenter";
import ChatsView from "./views/ChatsView";
import MainContentPresenter from "./presenters/MainContentPresenter";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>it's carpooling time!</p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button variant="contained">Look, an MUI button!</Button>
                    <SidebarPresenter/>
                    <NavbarPresenter/>
                    <ChatsView/>
                    <MainContentPresenter />
                </a>
            </header>
        </div>
    );
}

export default App;
