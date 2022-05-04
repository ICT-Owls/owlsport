import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
//import { FormControlUnstyled } from '@mui/base';
import { Button} from '@mui/material';
//import SearchIcon from '@mui/icons-material/Search';

// function UserInfoView() {
//     return (null);
// }

export default function EventCreatingView() {
    const [value, setValue] = React.useState/*<Date | null>*/(new Date());

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
                            <div>
                                <p>map</p>
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
