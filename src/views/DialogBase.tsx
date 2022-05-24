import { DialogTitle, IconButton } from '@mui/material';
import { Theme } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import React, { FC } from 'react';

type DialogTitleBaseProps = {
    title?: string;
    onClose?: () => void;
};

const DialogTitleBase: FC<DialogTitleBaseProps> = (props) => {
    return (
        <DialogTitle>
            {props.title}
            <IconButton
                aria-label="close"
                onClick={props.onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme: Theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
        </DialogTitle>
    );
};

export default DialogTitleBase;
