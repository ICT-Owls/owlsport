import SidebarView from '../views/SidebarView';
import { useState } from 'react';
import { logOut } from '../helpers/Firebase';

export default function SidebarPresenter({ user }) {
    const [openLogin, setOpenLogin] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    
    function handleLoginVisibility(bool) {
        setOpenLogin(bool);
    }
    function handleCreateVisibility(bool) {
        setOpenCreate(bool);
    }
    return SidebarView({
        openLogin,
        openCreate,
        handleLoginVisibility,
        handleCreateVisibility,
        user,
        signOut: logOut,
    });
}
