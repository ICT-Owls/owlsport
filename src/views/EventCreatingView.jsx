import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    Collapse,
    DialogContent,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextareaAutosize,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { TransitionGroup } from 'react-transition-group';
import ParticipantSelectorPresenter from '../presenters/ParticipantSelectorPresenter';
import AvatarView from './AvatarView';

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
            <ListItemText primary={item.label} />
        </ListItem>
    );
}
// Props:
//    user
//export default function EventCreatingView2 = props => {
const EventCreatingView = ({
    title,
    setTitle,
    description,
    setDescription,
    startDateTime,
    setStartDateTime,
    endDateTime,
    setEndDateTime,
    members,
    setMembers,
    location,
    setLocation,
    submit,
    user,
}) => {
    const [usersForEvent, setUsersForEvent] = React.useState([]);
   
    const handleAddUser = (options) => {
        setUsersForEvent((prev) => [...options, ...prev]);
    };

    const handleRemoveUser = (item) => {
        setUsersForEvent((prev) => [...prev.filter((i) => i !== item)]);
    };
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return (
        <>
            <DialogContent>
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
                                    label="Event"
                                    variant="outlined"
                                    value={title}
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
                                        value={startDateTime}
                                        onChange={(newValue) => {
                                            setStartDateTime(
                                                Date.parse(newValue)
                                            );
                                        }}
                                    />
                                </LocalizationProvider>
                            </div>

                            <div className="mb-6">
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
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
                                        value={startDateTime}
                                        onChange={(newDate) => {
                                            setStartDateTime(newDate);
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} />
                                        )}
                                    />
                                </LocalizationProvider>
                            </div>

                            <div className="mb-6">
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
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
                                        value={endDateTime}
                                        onChange={(newDate) => {
                                            setEndDateTime(Date.parse(newDate));
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} />
                                        )}
                                    />
                                </LocalizationProvider>
                            </div>

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

                            <div className="m-6">
                                <ParticipantSelectorPresenter
                                    onSubmit={handleAddUser}
                                    placeholderText="Invite user"
                                    buttonText="Invite"
                                    multiple
                                />
                                <List className="m-2 h-32 overflow-y-auto">
                                    <TransitionGroup>
                                        {usersForEvent.map((item) => (
                                            <Collapse key={item.email}>
                                                {renderItem({
                                                    item,
                                                    handleRemoveUser,
                                                })}
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
                                            onClick={submit}
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
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />

                                <div className="mt-8">
                                    <iframe
                                        className="b-0 h-full w-full"
                                        width="400"
                                        height="300"
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

export default EventCreatingView;
