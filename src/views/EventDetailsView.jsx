import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LocationOnIcon from '@mui/icons-material/LocationOn'; //Location Icon
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';

export default function EventDetailsView () {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const [currentButtonText, setCurrentButtonText] = useState('Show More');

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
    function CarPooler (props) {
        return (
            <div className='flex justify-start ml-4'>
                {/* <Card sx={{ minWidth: 150 }}> */}
                <Card>
                    <div className='flex ml-4 m-2'>
                        <div className='mr-2'>
                            <Avatar alt='Erik' img src='Logotype.png' />
                        </div>

                        <Typography gutterBottom variant='h6' component='div'>
                            Eric {props.number}
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

    const FRUITS = [
        <CarPooler number={3} key={3}></CarPooler>,
        <CarPooler number={2} key={2}></CarPooler>,
        <CarPooler number={1} key={1}></CarPooler>,
        <CarPooler number={4} key={4}></CarPooler>,
    ];

    function renderItem ({ item, handleRemoveFruit }) {
        return (
            <ListItem
                secondaryAction={
                    <IconButton
                        edge='end'
                        aria-label='delete'
                        title='Delete'
                        onClick={() => handleRemoveFruit()}
                    ></IconButton>
                }
            >
                <ListItemText primary={item} />
            </ListItem>
        );
    }

    const [fruitsInBasket, setFruitsInBasket] = React.useState(
        FRUITS.slice(0, 2)
    );

    const handleAddFruit = () => {
        setFruitsInBasket(FRUITS);
    };

    const handleRemoveFruit = () => {
        setFruitsInBasket(FRUITS.slice(0, 2));
        // setFruitsInBasket(prev => [...prev.filter(i => i !== item)]);
    };

    const addFruitButton = (
        <Button
            variant='contained'
            // disabled={fruitsInBasket.length >= FRUITS.length}
            onClick={() => {
                if (currentButtonText === 'Show more') {
                    handleAddFruit();
                } else {
                    handleRemoveFruit();
                }

                handleButtonTextChange();
            }}
        >
            {currentButtonText}
        </Button>
    );

    const handleButtonTextChange = () => {
        if (currentButtonText === 'Show more') {
            setCurrentButtonText('Show less');
        } else {
            setCurrentButtonText('Show more');
        }
    };

    return (
        <div>
            {FRUITS.map(item => item)}
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
                        <div className='flex overflow-scroll flex-row justify-around py-3 my-3'>
                            <div>
                                {addFruitButton}
                                <Box sx={{ mt: 1 }}>
                                    <List>
                                        <TransitionGroup>
                                            {FRUITS.map(item => (
                                                <Collapse key={item}>
                                                    {renderItem({
                                                        item,
                                                        handleRemoveFruit,
                                                    })}
                                                </Collapse>
                                            ))}
                                        </TransitionGroup>
                                    </List>
                                </Box>
                            </div>
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
