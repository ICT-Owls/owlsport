import { Box } from '@mui/material';
import React from 'react';

const MainContentContainer = (props: any) => {
    return (
        <Box sx={{ marginX: '2rem', minHeight: '50vh', maxWidth: '980px', width:'100%'}}>
            <div className={'h-full w-full bg-background-100 p-2 shadow-md rounded-md'}>
                {props.children}
            </div>
        </Box>
    );
};

export default MainContentContainer;