import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
//import { FormControlUnstyled } from '@mui/base';
import { Button, Grid } from '@mui/material';
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
        <div className='container absolut w-screen h-screen bg-black bg-opacity-10 flex justify-center'>
            <div className='flex w-full  justify-center bg-white mt-24 '>
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
                                <textfield
                                    type="text"
                                    placeholder="Event"
                                    className="
                                    w-full
                                    rounded
                                    p-3
                                    focus:border-primary
                                    "
                                    name="event"
                                    id="event"
                                />
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
                                <select className="form-select appearance-none
                                  block
                                  w-full
                                  px-3
                                  py-1.5
                                  text-base
                                  font-normal
                                  text-gray-700
                                  bg-white bg-clip-padding bg-no-repeat
                                  border border-solid border-gray-300
                                  rounded
                                  transition
                                  ease-in-out
                                  m-0
                                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                    <option selected>Duration (hours)</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>

                            <div className="mb-6">
                                <input
                                    type="text"
                                    placeholder="Location"
                                    className="
                                    w-full
                                    rounded
                                    p-3
                                    focus:border-primary
                                                                       "
                                    name="location"
                                    id="location"
                                />
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

                        <div  className='md:w-3/5 content-center ml-8'>
                            <div className="bg-gray-100 relative rounded-lg p-8 sm:p-12">
                                <textarea
                                    rows="12"
                                    placeholder="About"
                                    className="
                                    w-full
                                    rounded
                                    p-3
                                    font-family: 'Arial'

                                    "
                                    name="about"
                                    id="about"
                                ></textarea>

                                <div className='m-6'>
                                    <iframe
                                        sx={{ border: "0" }}
                                        w-full
                                        h-full
                                        // width="400"
                                        // height="400"
                                        // style="border:0"
                                        loading="lazy"
                                        frameBorder="0"
                                        allowFullScreen
                                        referrerPolicy="no-referrer-when-downgrade"
                                        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCGxW2vdNkBmPIc4GEer8Y85xAXPpfMjwY&q=Space+Needle,Seattle+WA">
                                    </iframe>
                                </div>



                            </div>
                            {/*<div className=''>*/}
                            {/*    <TextField className='w-full '*/}
                            {/*               label="Description"*/}
                            {/*               id="Description"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div className="h-full w-300">*/}
                                {/*<Wrapper apiKey={"AIzaSyDXvjtauHrSqoYDwlFH_ST899pZVcWY7jo"}>*/}
                                {/*    <MyMapComponent />*/}
                                {/*</Wrapper>*/}

                                {/*<div id='map' className="h-full w-300">*/}

                                {/*</div>*/}
                                {/*<script*/}
                                {/*    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDXvjtauHrSqoYDwlFH_ST899pZVcWY7jo&callback=initMap&v=weekly"*/}
                                {/*    defer*/}
                                {/*/>*/}

                                {/*<iframe*/}
                                {/*    sx={{ border: "0" }}*/}
                                {/*    width="400"*/}
                                {/*    height="300"*/}
                                {/*    // style="border:0"*/}
                                {/*    loading="lazy"*/}
                                {/*    frameBorder="0"*/}
                                {/*    allowFullScreen*/}
                                {/*    referrerPolicy="no-referrer-when-downgrade"*/}
                                {/*    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCGxW2vdNkBmPIc4GEer8Y85xAXPpfMjwY&q=Space+Needle,Seattle+WA">*/}
                                {/*</iframe>*/}
                            {/*</div>*/}

                        </div>
                    </div>

                </div>
            </div>
        </div>
        // <div className="event">
        //     <UserInfoView/>
        //
        //     <div className="content-center ">
        //         <TextField
        //             label="Event"
        //             id="Event"
        //         />
        //     </div>
        //
        //     <LocalizationProvider dateAdapter={AdapterDateFns}>
        //         <DateTimePicker
        //             renderInput={(props) => <TextField {...props} />}
        //             label="Select Date and Time"
        //             value={value}
        //             onChange={(newValue) => {
        //                 setValue(newValue);
        //             }}
        //         />
        //     </LocalizationProvider>
        //
        //     <div className="content-center">
        //         <TextField
        //             label="Description"
        //             id="Description"
        //         />
        //     </div>
        //
        //     <div className='content-center'>
        //         <div>
        //             <img src='avatar.png' alt='avatar' />
        //             <img src='avatar.png' alt='avatar' />
        //             <img src='avatar.png' alt='avatar' />
        //         </div>
        //     </div>
        //
        //
        // </div>
    );
}
