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

export default function CreateAccountView({
    showMe,
    handleVisibility,
    setDisplayName,
    setEmail,
    setPassword,
    setRepeatPassword,
    emailNotValid,
    passwordsDontMatch,
    passwordInvalid,
    displayNameError,
    displayName,
    email,
    password,
    repeatPassword,
}) {
    return (
        <div>
            <Dialog open={showMe} onClose={() => handleVisibility(false)}>
                <DialogTitle>Create an Account</DialogTitle>
                <DialogContent>
                    <TextField
                        error={!!displayNameError}
                        helperText={displayNameError}
                        required
                        autoFocus
                        margin="dense"
                        label="Display Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setDisplayName(e.target.value)}
                        value={displayName}
                    />
                    <TextField
                        error={!!emailNotValid}
                        helperText={emailNotValid}
                        required
                        margin="dense"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <TextField
                        error={!!passwordInvalid}
                        helperText={passwordInvalid}
                        required
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <TextField
                        error={!!passwordsDontMatch}
                        helperText={passwordsDontMatch}
                        required
                        margin="dense"
                        label="Repeat Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        value={repeatPassword}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleVisibility(false)}>
                        Cancel
                    </Button>
                    <Button
                        disabled={
                            !!displayNameError ||
                            !!emailNotValid ||
                            !!passwordInvalid ||
                            !!passwordsDontMatch ||
                            !!displayNameError
                        }
                        onClick={() => handleVisibility(false)}
                    >
                        Create Account
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
