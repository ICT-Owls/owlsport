import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LocationOnIcon from '@mui/icons-material/LocationOn'; //Location Icon
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import Container from '@mui/material/Container';

export default function EventDetailsView () {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <div className='flex flex-row justify-around bg-primary-100'>
            <div>1</div>
            <div>1</div>
            <div>1</div>
        </div>
        // <div>
        //     <Button
        //         onClick={() => {
        //             setScroll('paper');
        //             setOpen(true);
        //         }}
        //     >
        //         scroll
        //     </Button>

        //     <Dialog
        //         open={open}
        //         onClose={handleClose}
        //         scroll={scroll}
        //         aria-labelledby='scroll-dialog-title'
        //         aria-describedby='scroll-dialog-description'
        //     >
        //         <DialogContent>
        //             <div className='flex flex-row justify-around bg-primary-100'>
        //                 <div>1</div>
        //                 <div>1</div>
        //                 <div>1</div>
        //             </div>
        //         </DialogContent>

        //         <DialogActions>
        //             <Button onClick={handleClose}>Save and exit</Button>
        //         </DialogActions>
        //     </Dialog>
        // </div>
    );
}
