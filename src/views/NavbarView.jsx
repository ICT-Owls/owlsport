import React from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function NavbarView() {
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return (
        // eslint-disable-next-line 
        <div className="flex fixed top-0 left-0 justify-around w-full h-fit bg-opacity-90 bg-white">
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
            <div>{/* I act as a third item for formattings sake */}</div>
        </div>
    );
}
