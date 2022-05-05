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
import { Grid, MenuItem } from '@mui/material';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

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
    const CarPooler = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        // <div className='flex flex-col justify-around bg-gray-100'>
        //     <div className='flex flex-row justify-evenly'>
        //         <div className='flex flex-col justify-start my-3'>
        //             <div className='text-2xl'>Cool match</div>
        //             <div className='text-xs'>Organized by Eric Erricson</div>
        //         </div>
        //         <div className='flex flex-col justify-start my-3'>
        //             <Button
        //                 className='mb-5 w-52 bg-gray-300'
        //                 sx={{ color: 'black' }}
        //             >
        //                 Request ride
        //             </Button>
        //             <div className='my-1 w-fit h-fit text-xs text-gray-400'>
        //                 Thur, April 26, 2066 at 22:30 - Thur, April 26, 2066 at
        //                 23:30
        //             </div>
        //             <div className='my-1 w-fit h-fit text-xs text-gray-400'>
        //                 kungsträdgården
        //             </div>
        //         </div>
        //         <div className='my-5 w-14 h-14 bg-primary-100'>
        //             <div className=' text-xl'>APR 23</div>
        //         </div>
        //     </div>

        //     <div className='flex flex-row justify-around py-3 my-3 bg-gray-300'>
        //         <div>Description</div>
        //         <div>Carpooling</div>
        //         <div>Events</div>
        //     </div>
        //     <div className='flex flex-row justify-around py-3 my-3 bg-gray-300'>
        //         <CarPooler>CarPooler 1</CarPooler>
        //         <CarPooler>CarPooler 2</CarPooler>
        //         <CarPooler>CarPooler 3</CarPooler>
        //     </div>
        //     <Divider variant='middle' />
        //     <div className='my-1 w-fit h-fit text-xs text-gray-700'>
        //         Lorem Ipsum is simply dummy text of the printing and typesetting
        //         industry. Lorem Ipsum has been the industries standard dummy
        //         text ever since the 1500s, when an unknown printer took a galley
        //         of type and scrambled it to make a type specimen book. It has
        //         survived not only five centuries, but also the leap into
        //         electronic typesetting, remaining essentially unchanged. It was
        //         popularised in the 1960s with the release of Letraset sheets
        //         containing Lorem Ipsum passages, and more recently with desktop
        //         publishing software like Aldus PageMaker including versions of
        //         Lorem Ipsum.
        //     </div>
        //     <div>map</div>
        // </div>
        <div>
            <Button
                onClick={() => {
                    setScroll('paper');
                    setOpen(true);
                }}
            >
                scroll
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
            >
                <DialogContent>
                    <div className='flex flex-row justify-around child:w-32 child:h-32 bg-primary-100'>
                        <div>1</div>
                        <div>1</div>
                        <div>1</div>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Save and exit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
