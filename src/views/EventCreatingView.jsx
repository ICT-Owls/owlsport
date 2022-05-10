import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {
    Button,
    Box,
    DialogTitle,
    DialogContent, Collapse, ListItem,
    FormControl,
    InputLabel,
    List, IconButton, ListItemText,
    MenuItem,
    Select,
    TextareaAutosize,
} from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import DeleteIcon from '@mui/icons-material/Delete';
import { Wrapper } from '@googlemaps/react-wrapper';
import { useEffect, useRef } from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AvatarView from './AvatarView';

import PropTypes from 'prop-types';
import AvatarPresenter from '../presenters/AvatarPresenter';
import { EventCreatingPresenter } from '../presenters/EventCreatingPresenter';

const USERS = [
    '🍏 Mamad',
    '🍌 Samson',
    '🍍 Hugo',
    '🥥 Nima',
    '🍉 Francis',
];


// TODO: this function is a duplicate from EventListView.jsx
// Export it from that file!!!
function MemberBox(props) {
    const members = props.members;
    return (
        <List
            className={
                'flex flex-row flex-wrap items-center justify-center last:mr-2 child:m-1'
            }
        >
            {members.map((m) => (
                <AvatarPresenter key={m} user={props.user} userId={m} />
            ))}
        </List>
    );
}

function MyMapComponent({ center, zoom }) {
    console.log('MyMapComponent', center, zoom);
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

function renderItem({ item, handleRemoveUser }) {
    return (
        <ListItem
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="delete"
                    title="Delete"
                    onClick={() => handleRemoveUser(item)}
                >
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemText primary={item} />
        </ListItem>
    );
}
// Props:
//    user
//export default function EventCreatingView2 = props => {
const EventCreatingView2 = props => {
    console.log('props=',props);
    const [value, setValue] = React.useState(new Date());
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [startDateTime, setStartDateTime] = React.useState(0);
    const [endDateTime, setEndDateTime] = React.useState(0);
    const [members, setMembers] = React.useState([]);

    const {user} = props;

    const [usersForEvent, setUsersForEvent] = React.useState(USERS.slice(0, 3));
    const handleAddUser = () => {
        const nextHiddenItem = USERS.find((i) => !usersForEvent.includes(i));
        if (nextHiddenItem) {
            setUsersForEvent((prev) => [nextHiddenItem, ...prev]);
        }
    };

    const handleRemoveUser = (item) => {
        setUsersForEvent((prev) => [...prev.filter((i) => i !== item)]);
    };
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return (
        <>
            <DialogContent>
                <div className="flex-row flex justify-center">
                    {/*<div className="ml-14 flex justify-start">*/}
                    {/*    <div className="">*/}
                    {/*        <img*/}
                    {/*            src="avatar.png"*/}
                    {/*            className="h-12"*/}
                    {/*            alt="avatar"*/}
                    {/*        />*/}
                    {/*    </div>*/}

                    {/*    <div className="ml-8">*/}
                    {/*        <h5 className="">James Bond</h5>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {user ? (
                        <>
                            <Box
                                alignContent={'center'}
                                maxHeight="56px"
                            >
                                <AvatarView
                                    maxHeight="100%"
                                    user={{
                                        firstName: 'Test',
                                        lastName: 'Testson',
                                    }}
                                />
                            </Box>
                        </>
                    ) : (
                        <>
                            ERROR!
                        </>
                    )}


                    <div className='flex w-full px-12'>
                        <div className="rounded-lg bg-gray-100 p-8 sm:p-12">
                            <div className="mb-6">
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Event"
                                    variant="outlined"
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="mb-6">
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DatePicker
                                        renderInput={(props) => (
                                            <TextField {...props} />
                                        )}
                                        label="Select Date"
                                        className="
                                    focus:border-primary
                                    w-full
                                    rounded
                                    border-gray-500
                                    p-3
                                    text-gray-800
                                    outline-none
                                    focus-visible:shadow-none
                                    dark:border-slate-600
                                    dark:bg-slate-700
                                    dark:text-gray-50
                                    "
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                    />

                                </LocalizationProvider>
                            </div>

                            <div className="mb-6">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        label="Start time"
                                        className="
                                    focus:border-primary
                                    w-full
                                    rounded
                                    border-gray-500
                                    p-3
                                    text-gray-800
                                    outline-none
                                    focus-visible:shadow-none
                                    dark:border-slate-600
                                    dark:bg-slate-700
                                    dark:text-gray-50
                                    "
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>

                            <div className="mb-6">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        label="End time"
                                        className="
                                    focus:border-primary
                                    w-full
                                    rounded
                                    border-gray-500
                                    p-3
                                    text-gray-800
                                    outline-none
                                    focus-visible:shadow-none
                                    dark:border-slate-600
                                    dark:bg-slate-700
                                    dark:text-gray-50
                                    "
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>

                            {/*<div className="mb-6">*/}
                            {/*    <FormControl fullWidth>*/}
                            {/*        <InputLabel id="demo-simple-select-label">*/}
                            {/*            Hours*/}
                            {/*        </InputLabel>*/}
                            {/*        <Select*/}
                            {/*            labelId="demo-simple-select-label"*/}
                            {/*            id="demo-simple-select"*/}
                            {/*            value="1"*/}
                            {/*            label="Duration"*/}
                            {/*            onChange={(event) => {*/}
                            {/*                setEndDateTime(*/}
                            {/*                    startDateTime +*/}
                            {/*                        (isNaN(event.target.value)*/}
                            {/*                            ? 1*/}
                            {/*                            : event.target.value) **/}
                            {/*                            3600000*/}
                            {/*                );*/}
                            {/*            }}*/}
                            {/*        >*/}
                            {/*            <MenuItem value={1}>One</MenuItem>*/}
                            {/*            <MenuItem value={2}>Two</MenuItem>*/}
                            {/*            <MenuItem value={3}>Three</MenuItem>*/}
                            {/*        </Select>*/}
                            {/*    </FormControl>*/}
                            {/*</div>*/}

                            <div className="mb-6">
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Address"
                                    variant="outlined"
                                />
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

                            {/*<div className="m-6">*/}
                            {/*    <MemberBox*/}
                            {/*        members={members}*/}
                            {/*        user={props.user}*/}
                            {/*        className={'lg:min-w-full'}*/}
                            {/*    />*/}
                            {/*</div>*/}

                            <div className="m-6">
                                <Button
                                    variant="contained"
                                    disabled={usersForEvent.length >= USERS.length}
                                    onClick={handleAddUser}
                                >
                                    Add user
                                </Button>
                                <List className='m-2 overflow-y-auto h-32'>
                                    <TransitionGroup>
                                        {usersForEvent.map((item) => (
                                            <Collapse key={item}>
                                                {renderItem({ item, handleRemoveUser })}
                                            </Collapse>
                                        ))}
                                    </TransitionGroup>
                                </List>
                            </div>

                            <form className="">
                                <div className="">
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
                                            onClick={() => {
                                                props.callback({
                                                    members: members,
                                                    startDateTime:
                                                        startDateTime,
                                                    endDateTime: endDateTime,
                                                    description: description,
                                                    title: title,
                                                });
                                            }}
                                        >
                                            Create
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="ml-4 content-center md:w-3/5">
                            <div className="relative rounded-lg bg-gray-100 p-8 sm:p-12">
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={20}
                                    maxRows={25}
                                    placeholder="About"
                                    style={{ width: 400 }}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                />

                                <div className="mt-8">
                                    <iframe
                                        sx={{ border: '0' }}
                                        w-full
                                        h-full
                                        width="400"
                                        height="300"
                                        // style="border:0"
                                        loading="lazy"
                                        frameBorder="0"
                                        allowFullScreen
                                        referrerPolicy="no-referrer-when-downgrade"
                                        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCGxW2vdNkBmPIc4GEer8Y85xAXPpfMjwY&q=Space+Needle,Seattle+WA"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </DialogContent>
        </>
    );
};

export default EventCreatingView2;