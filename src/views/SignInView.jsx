import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { useEffect } from 'react';
import { startLogin } from '../helpers/Firebase';

export default function SignInView({ showMe, handleVisibility }) {
    useEffect(() => {
        if (showMe === true) startLogin(() => handleVisibility(false));
    }, [showMe]);

    return (
        <>
            <Dialog
                keepMounted={true}
                open={showMe}
                onClose={() => handleVisibility(false)}
            >
                <DialogContent>
                    <div id="firebaseui-auth-container"></div>
                    <div id="loader">Loading...</div>
                </DialogContent>
            </Dialog>
        </>
    );
}
