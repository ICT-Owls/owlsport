import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
//import { FormControlUnstyled } from '@mui/base';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextareaAutosize } from '@mui/material';
//import { Grid } from '@material-ui/core';
//import SearchIcon from '@mui/icons-material/Search';
import { Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef } from 'react';


// function UserInfoView() {
//     return (null);
// }
function MyMapComponent({ center, zoom}) {
    console.log("MyMapComponent", center, zoom);
    if (center === undefined) center = { lat: -25.344, lng: 131.031 };
    if (zoom === undefined) zoom = 6;
    const ref = useRef();

    useEffect(() => {
        new window.google.maps.Map(ref.current, {
            center,
            zoom,
        });
    });

    return <div ref={ref} id="map" />;
}

// const InputBox = params => {
//     const {placeholder, name, id} = params;
//     return (
//         <input
//             type="text"
//             placeholder={placeholder}
//             className="
//                 w-full
//                 rounded
//                 p-3
//                 text-gray-800
//                 dark:text-gray-50
//                 dark:bg-slate-700
//                 border-gray-500
//                 dark:border-slate-600
//                 outline-none
//                 focus-visible:shadow-none
//                 focus:border-primary
//                 "
//             name="event"
//             id="event"
//         />
//     );
// };

export default function EventCreatingView2() {
    const [value, setValue] = React.useState(new Date());

        //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return (
        // <div className='container absolut w-screen h-screen bg-black bg-opacity-10 flex justify-center'>
        <div>
            <div className='flex w-full justify-center bg-white mt-24'>
                <div className='m-8'>
                    <div className='justify-start ml-14 flex relative'>

                        {/*Avatar/UserID*/}
                        <div className=''>
                            <img src='avatar.png' className="h-12" alt='avatar' />
                        </div>

                        <div  className='ml-8'>
                            <h5 className=''>James Bond</h5>
                        </div>

                    </div>
                    <div className='flex w-full px-12 data-aos-duration="2000'>
                        <div className='bg-gray-100 relative rounded-lg p-8 sm:p-12'>
                            <div className="mb-6">
                                <TextField fullWidth id="outlined-basic" label="Event" variant="outlined" />
                            </div>

                            <div className="mb-6">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="Select Date and Time"
                                        className="
                                    w-full
                                    rounded
                                    p-3
                                    text-gray-800
                                    dark:text-gray-50
                                    dark:bg-slate-700
                                    border-gray-500
                                    dark:border-slate-600
                                    outline-none
                                    focus-visible:shadow-none
                                    focus:border-primary
                                    "
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                    />
                                </LocalizationProvider>
                            </div>

                            <div className="mb-6">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Hours</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value='1'
                                        label="Duration"
                                        // onChange={handleChange}
                                    >
                                        <MenuItem value={1}>One</MenuItem>
                                        <MenuItem value={2}>Two</MenuItem>
                                        <MenuItem value={3}>Three</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="mb-6">
                                <TextField fullWidth id="outlined-basic" label="Location" variant="outlined" />
                                {/*<input*/}
                                {/*    type="text"*/}
                                {/*    placeholder="Location"*/}
                                {/*    className="*/}
                                {/*    w-full*/}
                                {/*    rounded*/}
                                {/*    p-3*/}
                                {/*    focus:border-primary*/}
                                {/*                                       "*/}
                                {/*    name="location"*/}
                                {/*    id="location"*/}
                                {/*/>*/}
                            </div>

                            <div className='m-6'>
                                <div className='flex space-x-2 justify-center'>
                                    <div>
                                        <img src='avatar.png' className="h-12" alt='avatar' />
                                    </div>
                                    <div>
                                        <img src='avatar.png' className="h-12" alt='avatar' />
                                    </div>
                                    <div>
                                        <img src='avatar.png' className="h-12" alt='avatar' />
                                    </div>
                                </div>
                            </div>

                            <form className=''>
                                <div className=''>

                                    <div className='mt-4'>

                                        <Button
                                            variant="contained"
                                            className="
                                    w-full
                                    hover: bg-primary
                                    rounded
                                    border border-primary
                                    p-3
                                    transition
                                    duration-500
                                    "
                                        >
                                           Create
                                        </Button>
                                    </div>
                                </div>
                            </form>

                        </div>

                        <div  className='md:w-3/5 content-center ml-4'>
                            <div className="bg-gray-100 relative rounded-lg p-8 sm:p-12">
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={15}
                                    maxRows={20}
                                    placeholder="About"
                                    style={{ width: 600 }}
                                />

                                <div className='m-6'>
                                    <iframe
                                        sx={{ border: "0" }}
                                        w-full
                                        h-full
                                        //width="400"
                                        //height="400"
                                        // style="border:0"
                                        loading="lazy"
                                        frameBorder="0"
                                        allowFullScreen
                                        referrerPolicy="no-referrer-when-downgrade"
                                        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCGxW2vdNkBmPIc4GEer8Y85xAXPpfMjwY&q=Space+Needle,Seattle+WA">
                                    </iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
