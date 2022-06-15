import {
    Box,
    Button,
    Collapse,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextareaAutosize,
    TextField,
} from '@mui/material';
import { Theme } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { FC } from 'react';
import { useAuthUser, useUser } from 'models/Model';
import MapInputPresenter from 'presenters/MapInputPresenter';
import { TransitionGroup } from 'react-transition-group';
import ParticipantSelectorPresenter, {
    UserOption,
} from 'presenters/ParticipantSelectorPresenter';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AvatarView from './AvatarView';
import { EventMember, User } from 'api-client';
import { LatLngLiteral, Location } from 'api/types';
import { getUserByEmail } from 'api';

type EventMemberWithEmail = EventMember & { email: string };

type EventEditViewProps = {
    title: string;
    setTitle: (title: string) => void;
    description: string;
    setDescription: (description: string) => void;
    startDateTime: number;
    setStartDateTime: (dateTime: number) => void;
    endDateTime: number;
    setEndDateTime: (dateTime: number) => void;
    members: { [key: string]: EventMemberWithEmail };
    setMembers: (members: { [key: string]: EventMemberWithEmail }) => void;
    location: Location;
    setLocation: (location: Location) => void;
    submit: () => void;
    user: User;
    date: number;
    setDate: (date: number) => void;
};

const NULL_USER: User = {
    id: 'null',
    firstName: 'null',
    lastName: 'null',
    email: 'null',
    dateOfBirth: 0,
    friends: [],
    creationDate: 0,
};

const EventEditView: FC<EventEditViewProps> = (props: EventEditViewProps) => {
    const handleAddUser = async (options: UserOption[]) => {
        const results = await Promise.allSettled(
            options.map((o) => getUserByEmail(o.email))
        );

        const validUsers: User[] = results
            .map<User>((r) =>
                r.status ? (r as PromiseFulfilledResult<User>).value : NULL_USER
            )
            .filter((r) => r.id !== NULL_USER.id);

        const mapped: { [key: string]: EventMemberWithEmail } = {};
        validUsers.forEach((u) => {
            mapped[u.id] = {
                id: u.id,
                email: u.email,
                requiresCarpooling: false,
                isDriver: false,
                isPassenger: false,
            };
        });

        props.setMembers({ ...props.members, ...mapped });
    };

    const handleRemoveUser = (item: EventMemberWithEmail) => {
        const newMembers: { [key: string]: EventMemberWithEmail } = {};
        Object.values(props.members).filter((m) => {
            if (m.email !== item.email) {
                newMembers[m.id] = m;
            }
        });
        props.setMembers(newMembers);
    };
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return (
        <>
            <DialogContent>
                <div className="flex flex-row justify-center">
                    {props.user ? (
                        <Box alignContent={'center'} maxHeight="56px">
                            <AvatarView user={props.user} />
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
                                    value={props.title}
                                    onChange={(e) => {
                                        props.setTitle(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="mb-6">
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DatePicker
                                        renderInput={(props) => (
                                            <TextField
                                                {...props}
                                                className="w-full"
                                            />
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
                                        value={props.date}
                                        onChange={(newValue, keyBoardInput) => {
                                            props.setDate(
                                                newValue ||
                                                    Date.parse(
                                                        keyBoardInput || ''
                                                    )
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
                                        value={props.startDateTime}
                                        onChange={(newDate, keyBoardInput) => {
                                            props.setStartDateTime(
                                                newDate ||
                                                    Date.parse(
                                                        keyBoardInput || ''
                                                    )
                                            );
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="w-full"
                                            />
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
                                        value={props.endDateTime}
                                        onChange={(newDate, keyBoardInput) => {
                                            props.setEndDateTime(
                                                newDate ||
                                                    Date.parse(
                                                        keyBoardInput || ''
                                                    )
                                            );
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="w-full"
                                            />
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
                                    value={props.location.address || ''}
                                    onChange={(e) =>
                                        props.setLocation({
                                            longitude: props.location.longitude,
                                            latitude: props.location.latitude,
                                            address: e.target.value,
                                        })
                                    }
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

                            <div className="mb-6">
                                <ParticipantSelectorPresenter
                                    onSubmit={handleAddUser}
                                    placeholderText="Invite user"
                                    buttonText="Invite"
                                    multiple
                                    showButton={true}
                                />
                                <List className="m-2 h-32 overflow-y-auto">
                                    <TransitionGroup>
                                        {Object.values(props.members).map(
                                            (item) => (
                                                <Collapse key={item.email}>
                                                    {renderItem({
                                                        item,
                                                        handleRemoveUser,
                                                    })}
                                                </Collapse>
                                            )
                                        )}
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
                                            onClick={props.submit}
                                        >
                                            Create
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="ml-4 flex content-center self-stretch md:w-3/5">
                            <div className="relative rounded-lg bg-gray-100 p-8 sm:p-12">
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={15}
                                    maxRows={20}
                                    placeholder="About"
                                    style={{ width: 400 }}
                                    value={props.description}
                                    onChange={(e) =>
                                        props.setDescription(e.target.value)
                                    }
                                />

                                <div className="mt-8">
                                    <MapInputPresenter
                                        size={{
                                            width: '100%',
                                            height: '25rem',
                                        }}
                                        mapContext="eventCreate"
                                        onPlace={(newLocation) =>
                                            props.setLocation(newLocation)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </>
    );
};
const renderItem: FC<{
    item: EventMemberWithEmail;
    handleRemoveUser: (user: EventMemberWithEmail) => void;
}> = (props) => {
    return (
        <ListItem
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="delete"
                    title="Delete"
                    onClick={() => props.handleRemoveUser(props.item)}
                >
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemText primary={props.item.email} />
        </ListItem>
    );
};

export default EventEditView;
