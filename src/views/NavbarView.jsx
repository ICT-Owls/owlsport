import SearchIcon from '@mui/icons-material/Search';
import { IconButton, TextField, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import { useChat, useUser } from 'models/Model';
import AvatarView from './AvatarView';

export default function NavbarView() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [chat, setChat] = useChat();
    const [user] = useUser();
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
                'fixed z-50 grid h-fit w-full grid-cols-12 bg-background-100 shadow-sm lg:grid-cols-6'
            }
        >
            <Link
                to="/"
                className={'col-span-1 flex items-center justify-center'}
            >
                <img src="Solid_Logotype.png" className={'h-10'} alt="" />
            </Link>
            <div
                className={
                    'col-span-10 m-2 flex w-full justify-center lg:col-span-4'
                }
            >
                <TextField
                    className="w-2/3 max-w-3xl"
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
            <div className=" col-span-1 flex justify-end pr-5">
                <IconButton className="hidden lg:block">
                    <NotificationsNoneIcon />
                </IconButton>
                <IconButton
                    className="hidden lg:block"
                    onClick={() => setChat(!chat)}
                >
                    <ChatIcon />
                </IconButton>
                <IconButton className="hidden lg:block">
                    <PeopleIcon />
                </IconButton>
                <IconButton className="hidden lg:block">
                    <SettingsIcon />
                </IconButton>
                <IconButton className="hidden lg:block">
                    <AvatarView maxHeight="100%" user={user} />
                </IconButton>

                <IconButton
                    className="lg:hidden"
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
                        <AvatarView maxHeight="100%" user={user} />
                    </MenuItem>
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
                    <MenuItem
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        <SettingsIcon />
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
    //*/
}
