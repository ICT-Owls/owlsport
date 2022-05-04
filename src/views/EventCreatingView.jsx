import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
//import { FormControlUnstyled } from '@mui/base';
import { Button, Grid } from '@mui/material';
import { Grid, } from '@material-ui/core';
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

export default function EventCreatingView() {
    const [value, setValue] = React.useState(new Date());

    return(
        // <Form onSubmit={handleSubmit}>
        <Form>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="fullName"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        label="Mobile"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />
                    <Controls.Input
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                    <Controls.Select
                        name="departmentId"
                        label="Department"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        error={errors.departmentId}
                    />
                    <Controls.DatePicker
                        name="hireDate"
                        label="Hire Date"
                        value={values.hireDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        name="isPermanent"
                        label="Permanent Employee"
                        value={values.isPermanent}
                        onChange={handleInputChange}
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    );
}

export default function EventCreatingView2() {
    const [value, setValue] = React.useState(new Date());

        //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return (
        <div className='container absolut w-screen h-screen bg-black bg-opacity-10 flex justify-center'>
            <div className='flex w-full  justify-center bg-white mt-24 '>
                {/*<UserInfoView/>*/}

                <div className='m-8'>
                    <div className='justify-start flex'>
                        {/*We need to have a global state with user info to display here*/}
                        <div className=''>
                            <img src='avatar.png' className="h-12" alt='avatar' />

                        </div>

                        <div  className='ml-8'>
                            <h5 className=''>James Bond</h5>

                        </div>

                    </div>{/*md:w-1/2 content-center*/}
                    <div className='flex'>
                        <div  className='md:w-2/5 content-center min-w-200'>
                            <form className=''>
                                <div className=''>
                                    <div className=''>
                                        <TextField className='w-full '
                                                   label="Event name"
                                                   id="EventName"
                                        />
                                    </div>
                                    <div  className='w-full mt-4'>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateTimePicker
                                                renderInput={(props) => <TextField {...props} />}
                                                label="Select Date and Time"
                                                value={value}
                                                onChange={(newValue) => {
                                                    setValue(newValue);
                                                }}
                                            />
                                        </LocalizationProvider>

                                    </div>
                                    <div>

                                    </div>

                                    <div className='m-6'>
                                        <div className='flex  space-x-2'>
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



                                    <div className='mt-4'>
                                        <Button variant="contained"
                                                color="secondary"
                                                size="medium"
                                        > Create </Button>
                                    </div>
                                </div>
                            </form>

                        </div>

                        <div  className='md:w-3/5 content-center ml-8'>
                            <div className=''>
                                <TextField className='w-full '
                                           label="Description"
                                           id="Description"
                                />
                            </div>
                            <div className="h-full w-300">
                                {/*<Wrapper apiKey={"AIzaSyDXvjtauHrSqoYDwlFH_ST899pZVcWY7jo"}>*/}
                                {/*    <MyMapComponent />*/}
                                {/*</Wrapper>*/}

                                {/*<div id='map' className="h-full w-300">*/}

                                {/*</div>*/}
                                {/*<script*/}
                                {/*    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDXvjtauHrSqoYDwlFH_ST899pZVcWY7jo&callback=initMap&v=weekly"*/}
                                {/*    defer*/}
                                {/*/>*/}

                                <iframe
                                    sx={{ border: "0" }}
                                    width="400"
                                    height="300"
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
