import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { startLogin } from '../helpers/Firebase';
import { useEffect } from 'react';

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
