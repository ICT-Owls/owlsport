import * as React from 'react';
import {Avatar, AvatarGroup, Card, IconButton} from "@mui/material";
import AvatarView from "./AvatarView";
import Typography from "@mui/material/Typography";
import {formatUsername} from "../helpers/Format";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";

export const DriversCardView = (props) => {
    //console.log(props);
    const {driver}=props;

    return (
        <div className=''>
            <Card>
                <div className="m-2 ml-4 flex flex-col">
                    <div className="mr-2 flex flex-row items-center">
                        <AvatarView user={driver} />

                        <Typography
                            className="ml-2"
                            variant="h6"
                            component="div"
                        >
                            {formatUsername(driver)}
                        </Typography>
                    </div>

                    <div className="flex">
                        <IconButton
                            aria-label="location"
                            className="m-0"
                            size="small"
                        >
                            <LocationOnIcon fontSize="small" />
                            <p>Somewhere close to you</p>
                        </IconButton>
                    </div>

                    <div className=" flex justify-start ">

                        <div className="ml-20 flex">
                            <Button
                                variant="contained"
                                className="border-primary rounded border bg-primary-100 transition duration-500">
                                PICK UP
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};