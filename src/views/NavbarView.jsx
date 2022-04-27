import { Box, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function NavbarView() {
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return (
        <div className="w-full h-fit fixed top-0 left-0 flex justify-around bg-white bg-opacity-90">
            <IconButton
                color="primary"
                aria-label="SolidSport"
                component="span"
            >
                <img src="Solid_Logotype.png" className="h-6" alt="" />
            </IconButton>
            <Box
                className="m-4 flex justify-start"
                sx={{
                    width: 1000,
                    maxWidth: '100%',
                }}
            >
                <TextField fullWidth label="fullWidth" id="fullWidth" />
                <IconButton
                    color="primary"
                    aria-label="SolidSport"
                    component="span"
                >
                    <SearchIcon />
                </IconButton>
            </Box>
            <div>{/* I act as a third item for formattings sake */}</div>
        </div>
    );
}
