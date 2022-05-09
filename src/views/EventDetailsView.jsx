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

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AvatarGroup from '@mui/material/AvatarGroup';

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
    function CarPooler () {
        return (
            <div className='flex justify-start ml-4'>
                {/* <Card sx={{ minWidth: 150 }}> */}
                <Card>
                    <div className='flex ml-4 m-2'>
                        <div className='mr-2'>
                            <Avatar alt='Erik' img src='Logotype.png' />
                        </div>

                        <Typography gutterBottom variant='h6' component='div'>
                            Eric Ericsson
                        </Typography>
                    </div>

                    <div className='flex ml-4'>
                        <IconButton aria-label='location' size='small'>
                            <LocationOnIcon fontSize='small' />
                            <p>Location</p>
                        </IconButton>
                    </div>

                    <div className='justify-start flex ml-4 '>
                        <AvatarGroup max={4}>
                            <Avatar alt='Erik' img src='Logotype.png' />
                            <Avatar alt='Erik' img src='Logotype.png' />
                            <Avatar alt='Erik' img src='Logotype.png' />
                            <Avatar alt='Erik' img src='Logotype.png' />
                        </AvatarGroup>

                        <div className='flex ml-20'>
                            <Button
                                variant='contained'
                                className='
                                hover: rounded
                                border
                                transition duration-500
                                bg-primary
                                border-primary
                                '
                            >
                                JOIN
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    return (
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
                disablePortal
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
            >
                <DialogContent>
                    <div className='flex flex-col justify-around bg-gray-100'>
                        <div className='flex flex-row justify-evenly'>
                            <div className='flex flex-col justify-start my-3 mx-10'>
                                <div className='text-2xl'>Cool match</div>
                                <div className='text-xs'>
                                    Organized by Eric Erricson
                                </div>
                            </div>
                            <div className='flex flex-col justify-start my-3 mx-10'>
                                <Button
                                    className='mb-5 w-52 bg-gray-300'
                                    sx={{ color: 'black' }}
                                >
                                    Request ride
                                </Button>
                                <div className='my-1 w-fit h-fit text-xs text-gray-400'>
                                    Thur, April 26, 2066 at 22:30 - Thur, April
                                    26, 2066 at 23:30
                                </div>
                                <div className='my-1 w-fit h-fit text-xs text-gray-400'>
                                    kungsträdgården
                                </div>
                            </div>
                            <div className='my-5 mx-10 w-14 h-14 bg-primary-100'>
                                <div className=' text-xl'>APR 23</div>
                            </div>
                        </div>

                        <div className='flex flex-row justify-around py-3 my-3 bg-gray-300'>
                            <div>Description</div>
                            <div>Carpooling</div>
                            <div>Events</div>
                        </div>
                        <div className='flex flex-row justify-around py-3 my-3'>
                            <CarPooler></CarPooler>
                            <CarPooler></CarPooler>
                            <CarPooler></CarPooler>
                        </div>
                        <Divider variant='middle' />
                        <div className='my-1 w-fit h-fit text-xs text-gray-700'>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industries standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                        </div>
                        <Divider variant='middle' />

                        <div> MAP </div>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Save and exit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
