import SearchIcon from '@mui/icons-material/Search';
import { IconButton, TextField, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import { useState } from 'react';
import { useChat } from 'models/Model';

export default function NavbarView() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [chat, setChat] = useChat();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div
            className={
                'fixed z-50 grid h-fit w-full grid-cols-6 bg-background-100 shadow-sm'
            }
        >
            <Link to="/" className={'flex items-center justify-center'}>
                <img src="Logotype.png" className={'h-10'} alt="" />
            </Link>
            <div className={'col-span-4 m-2 flex w-full justify-center'}>
                <TextField
                    className="max-w-5xl"
                    placeholder="search"
                    fullWidth
                    id="navbar-search"
                    color="secondary"
                    size="small"
                />
                <IconButton
                    color="secondary"
                    aria-label="Search"
                    component="span"
                >
                    <SearchIcon color="secondary" />
                </IconButton>
            </div>
            <div className=" col-span-1 flex justify-end">
                <IconButton className="hidden md:block">
                    <NotificationsNoneIcon />
                </IconButton>
                <IconButton
                    className="hidden md:block"
                    onClick={() => setChat(!chat)}
                >
                    <ChatIcon />
                </IconButton>
                <IconButton className="hidden md:block">
                    <PeopleIcon />
                </IconButton>
                <IconButton
                    className="md:hidden"
                    id="basic-button"
                    onClick={handleClick}
                >
                    <ExpandMoreIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        <NotificationsNoneIcon />
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleClose();
                            setChat(!chat);
                        }}
                    >
                        <ChatIcon />
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        <PeopleIcon />
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
    //*/
}
