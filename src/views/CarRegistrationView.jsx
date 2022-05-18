import * as React from 'react';
import {Box, Button, Container, Typography} from "@mui/material";
import AvatarView from "./AvatarView";
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CarRegistrationView = (props) => {

    const {carModel, setCarModel,
        carNumber, setCarNumber,
        fromLocation, setFromLocation,
        seatsCount, setSeatsCount,
        submit, user } = props;
    console.log('CarRegistrationView', props);
    //const [seatsCount, setSeatsCount] =  React.useState(1);

    const inc = () => {
        setSeatsCount(seatsCount+1);
    };

    const dec = () => {
        if (seatsCount>1)
            setSeatsCount(seatsCount - 1);
    };

    return (
        <Container sx={{ paddingTop: '2rem' }}>
            <Typography textAlign={'center'} variant="h3">
                Car Registration
            </Typography>
            <Box  className='overflow-hidden'>
                <div className="flex flex-row justify-center">
                    {user ? (
                        <Box alignContent={'center'} maxHeight="56px">
                            <AvatarView maxHeight="100%" user={user} />
                        </Box>
                    ) : (
                        <>ERROR!</>
                    )}

                    <div className="flex w-full px-12">
                        <div className="rounded-lg bg-gray-100 p-8 sm:p-12">
                            <div className="mb-6">
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Car Model"
                                    variant="outlined"
                                    value={carModel}
                                    onChange={(e) => {
                                        setCarModel(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="mb-6">
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Plate number"
                                    variant="outlined"
                                    value={carNumber}
                                    onChange={(e) => {
                                        setCarNumber(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="mb-6">
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="From location"
                                    variant="outlined"
                                    value={fromLocation}
                                    onChange={(e) => {
                                        setFromLocation(e.target.value);
                                    }}
                                />
                            </div>

                            {/* Updown car seats selection */}
                            <div  className=''>
                                <Typography  className=''>
                                    Number of seats
                                </Typography>
                                <div className="flex justify-center">
                                    <Button  onClick={dec}>
                                        <RemoveIcon/>
                                    </Button>
                                    <h3>{seatsCount}</h3>
                                    <Button onClick={inc}>
                                        <AddIcon/>
                                    </Button>
                                </div>
                            </div>


                            <div className="mt-4">
                                <Button
                                    variant="contained"
                                    className="
                                    hover:
                                    bg-primary border-primary
                                    w-full
                                    rounded border
                                    p-3
                                    transition
                                    duration-500
                                    "
                                    onClick={submit}
                                >
                                    Create
                                </Button>
                            </div>



                            {/*<div className="h-max-48 h-48 overflow-y-scroll">*/}
                            {/*    <List className="flex flex-row flex-wrap justify-center">*/}
                            {/*        {CarpoolerView({*/}
                            {/*            driver: user,*/}
                            {/*            seats: 4,*/}

                            {/*        })}*/}
                            {/*    </List>*/}
                            {/*</div>*/}

                            {/*<div className="mb-6">*/}
                            {/*    <TextField*/}
                            {/*        fullWidth*/}
                            {/*        id="outlined-basic"*/}
                            {/*        label="Address"*/}
                            {/*        variant="outlined"*/}
                            {/*        value={location.address || ''}*/}
                            {/*        onChange={(e) =>*/}
                            {/*            setLocation({*/}
                            {/*                longtitude: 0,*/}
                            {/*                latitude: 0,*/}
                            {/*                address: e.target.value,*/}
                            {/*            })*/}
                            {/*        }*/}
                            {/*    />*/}
                            {/*</div>*/}

                            {/*<form className="">*/}
                            {/*    <div className="">*/}
                            {/*        <div className="mt-4">*/}
                            {/*            <Button*/}
                            {/*                variant="contained"*/}
                            {/*                className="*/}
                            {/*        hover:*/}
                            {/*        bg-primary border-primary*/}
                            {/*        w-full*/}
                            {/*        rounded border*/}
                            {/*        p-3*/}
                            {/*        transition*/}
                            {/*        duration-500*/}
                            {/*        "*/}
                            {/*                onClick={submit}*/}
                            {/*            >*/}
                            {/*                Register*/}
                            {/*            </Button>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</form>*/}
                        </div>

                        {/*<div className="ml-4 content-center md:w-3/5">*/}

                        {/*    <div className="mt-8">*/}
                        {/*        <iframe*/}
                        {/*            className="b-0 h-full w-full"*/}
                        {/*            width="400"*/}
                        {/*            height="300"*/}
                        {/*            loading="lazy"*/}
                        {/*            frameBorder="0"*/}
                        {/*            allowFullScreen*/}
                        {/*            referrerPolicy="no-referrer-when-downgrade"*/}
                        {/*            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCGxW2vdNkBmPIc4GEer8Y85xAXPpfMjwY&q=Space+Needle,Seattle+WA"*/}
                        {/*        ></iframe>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </Box>
        </Container>
    );
};


export default CarRegistrationView;