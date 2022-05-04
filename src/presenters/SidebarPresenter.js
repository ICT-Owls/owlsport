import SidebarView from '../views/SidebarView';
import { useState } from 'react';

export default function SidebarPresenter(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);

    function handleLoginVisibility(bool) {
        setOpenLogin(bool);
    }
    function handleCreateVisibility(bool) {
        setOpenCreate(bool);
    }
    return SidebarView({
        isLoggedIn,
        openLogin,
        openCreate,
        setIsLoggedIn,
        handleLoginVisibility,
        handleCreateVisibility,
    });
}
