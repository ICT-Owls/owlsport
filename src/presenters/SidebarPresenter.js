import SidebarView from '../views/SidebarView';
import { useState } from 'react';

export default function SidebarPresenter(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

    function handleLoginOpen() {
        setOpenLogin(true);
    }

    function handleLoginClose() {
        setOpenLogin(false);
    }
    return SidebarView({
        openLogin,
        handleLoginOpen,
        handleLoginClose,
        isLoggedIn,
        setIsLoggedIn,
    });
}
