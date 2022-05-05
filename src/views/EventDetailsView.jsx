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

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <div className='flex flex-row justify-around '>
            {/*<div>1</div>*/}
            {/*<div>1</div>*/}
            {/*<div>1</div>*/}

            <div className="flex justify-start ml-4 m-20">

                <div className='flex mr-2'>
                    <Card sx={{ minWidth: 350 }}>
                        <div className='flex ml-4 m-2'>
                            <div className='mr-2'>
                                <Avatar alt="Erik" img src='Logotype.png' />
                            </div>

                            <Typography gutterBottom variant="h6" component="div">
                                Eric Ericsson
                            </Typography>
                        </div>

                        <div className='flex ml-4'>
                            <IconButton aria-label="location" size="small">
                                <LocationOnIcon fontSize="small" />
                                <p>Location</p>
                            </IconButton>

                        </div>

                        <div className='justify-start flex ml-4 '>


                            <AvatarGroup max={4}>
                                <Avatar alt="Erik" img src='Logotype.png' />
                                <Avatar alt="Erik" img src='Logotype.png' />
                                <Avatar alt="Erik" img src='Logotype.png' />
                                <Avatar alt="Erik" img src='Logotype.png' />
                            </AvatarGroup>

                            <div className= 'flex ml-20'>
                                <Button
                                    variant="contained"
                                    className="
                                        hover: bg-primary
                                        rounded
                                        border border-primary
                                        transition
                                        duration-500
                                        "                        >
                                    JOIN
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className='flex mr-2'>
                    <Card sx={{ minWidth: 350 }}>
                        <div className='flex ml-4 m-2'>
                            <div className='mr-2'>
                                <Avatar alt="Erik" img src='Logotype.png' />
                            </div>

                            <Typography gutterBottom variant="h6" component="div">
                                Eric Ericsson
                            </Typography>
                        </div>

                        <div className='flex ml-4'>
                            <IconButton aria-label="location" size="small">
                                <LocationOnIcon fontSize="small" />
                                <p>Location</p>
                            </IconButton>

                        </div>

                        <div className='justify-start flex ml-4 '>


                            <AvatarGroup max={4}>
                                <Avatar alt="Erik" img src='Logotype.png' />
                                <Avatar alt="Erik" img src='Logotype.png' />
                                <Avatar alt="Erik" img src='Logotype.png' />
                                <Avatar alt="Erik" img src='Logotype.png' />
                            </AvatarGroup>

                            <div className= 'flex ml-20'>
                                <Button
                                    variant="contained"
                                    className="
                                        hover: bg-primary
                                        rounded
                                        border border-primary
                                        transition
                                        duration-500
                                        "                        >
                                    JOIN
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className='flex mr-2'>
                    <Card sx={{ minWidth: 350 }}>

                        <div className='flex ml-4 m-2'>
                            <div className='mr-2'>
                                <Avatar alt="Erik" img src='Logotype.png' />
                            </div>
                            <Typography gutterBottom variant="h6" component="div">
                                Eric Ericsson
                            </Typography>
                        </div>

                        <div className='flex ml-4'>
                            <IconButton aria-label="location" size="small">
                                <LocationOnIcon fontSize="small" />
                                <p>Location</p>
                            </IconButton>

                        </div>
<div className='justify-start flex ml-4 '>


            <AvatarGroup max={4}>
                <Avatar alt="Erik" img src='Logotype.png' />
                <Avatar alt="Erik" img src='Logotype.png' />
                <Avatar alt="Erik" img src='Logotype.png' />
                <Avatar alt="Erik" img src='Logotype.png' />
            </AvatarGroup>

    <div className= 'flex ml-20'>
        <Button
            variant="contained"
            className="
                hover: bg-primary
                rounded
                border border-primary
                transition
                duration-500
                "                        >
            JOIN
        </Button>
    </div>
</div>


                        <CardActions>

                        </CardActions>
                    </Card>
                </div>
            </div>

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
