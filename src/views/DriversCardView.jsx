import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Card, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { formatUsername } from '../helpers/Format';
import AvatarView from './AvatarView';

export default function DriversCardView({ member, address }) {
    return (
        <div>
            <Card>
                <div className="m-2 ml-4 flex flex-col">
                    <div className="mr-2 flex flex-row items-center">
                        <AvatarView user={member} />

                        <Typography
                            className="ml-2"
                            variant="h6"
                            component="div"
                        >
                            {formatUsername(member)}
                        </Typography>
                    </div>

                    <div className="flex">
                        <IconButton
                            aria-label="location"
                            className="m-0"
                            size="small"
                        >
                            <LocationOnIcon fontSize="small" />
                            <p>address</p>
                        </IconButton>
                    </div>

                    <div className=" flex justify-start ">
                        <div className="ml-20 flex">
                            <Button
                                variant="contained"
                                className="border-primary rounded border bg-primary-100 transition duration-500"
                            >
                                Pick Up
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
