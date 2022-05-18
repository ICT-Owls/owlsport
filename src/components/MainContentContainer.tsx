import { Box } from '@mui/material';
import React from 'react';

const MainContentContainer = (props: any) => {
    return (
        <Box
            sx={{
                marginX: '2rem',
                height:'100%',
                minHeight: '50vh',
                maxWidth: '980px',
                width: '100%',
            }}
        >
            <div className="h-full w-full rounded-tr-md rounded-br-md  bg-background-100 bg-background-100 bg-opacity-80 p-0 shadow-md">
                {props.children}
            </div>
        </Box>
    );
};

export default MainContentContainer;
