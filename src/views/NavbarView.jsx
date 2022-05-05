import React from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

export default function NavbarView() {
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return (
        <div
            className={
                'bg-primary fixed flex h-fit w-full justify-around bg-background-100'
            }
        >
            <Link
                to="/"
                className={'ml-8 mr-8 flex items-center justify-center'}
            >
                <img src="Logotype.png" className={'h-10'} alt="" />
            </Link>
            <div className={'m-2 flex w-full justify-start'}>
                <TextField
                    fullWidth
                    placeholder="search"
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
            </div>{' '}
            <div>{/* I act as a third item for formattings sake */}</div>
        </div>
    );
}
