import SidebarView from '../views/SidebarView';
import { useState } from 'react';
import { auth } from '../helpers/Firebase';

export default function SidebarPresenter({ user }) {
    const [openLogin, setOpenLogin] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    function signOut() {
        auth.signOut().catch((error) =>
            console.error('Signout failed: ', error)
        );
    }

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
        signOut,
    });
}
