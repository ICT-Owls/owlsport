import React from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function NavbarView() {
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    /*
    return (
        <nav className="navbar is-fresh"
        role='navigaion'
        aria-label='main navigation'>
            <IconButton color="secondary" aria-label="Search" component="span">
                <img src="Logotype.png" className="h-10" alt="" />
            </IconButton>
            <Box
                className="flex justify-start m-4"
                sx={{
                    width: 1000,
                    maxWidth: '100%',
                }}
            >
                <TextField
                    fullWidth
                    label="fullWidth"
                    id="fullWidth"
                    color="secondary"
                />
                <IconButton
                    color="secondary"
                    aria-label="Search"
                    component="span"
                >
                    <SearchIcon color="secondary" sx={{ fontSize: 40 }} />
                </IconButton>
            </Box>
        </nav>
    );
    /*/
    return (
        <div className="w-full h-fit fixed top-0 left-0 flex justify-around bg-primary bg-opacity-90 bg-primary-200">
            <IconButton color="secondary" aria-label="Search" component="span">
                <img src="Logotype.png" className="h-10" alt="" />
            </IconButton>
            <Box
                className="flex justify-start m-4"
                sx={{
                    width: 1000,
                    maxWidth: '100%',
                }}
            >
                <TextField
                    fullWidth
                    label="fullWidth"
                    id="fullWidth"
                    color="secondary"
                />
                <IconButton
                    color="secondary"
                    aria-label="Search"
                    component="span"
                >
                    <SearchIcon color="secondary" sx={{ fontSize: 40 }} />
                </IconButton>
            </Box>

        </div>
    );
    //*/
}
