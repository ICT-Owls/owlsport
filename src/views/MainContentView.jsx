import React, { useEffect, useState, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import EventListPresenter from '../presenters/EventListPresenter';
import EventDetailsPresenter from '../presenters/EventDetailsPresenter';
import CarRegistrationPresenter from '../presenters/CarRegistrationPresenter';
import MapInputPresenter from 'presenters/MapInputPresenter';
import WelcomeView from './WelcomeView';
import { CircularProgress, Fade } from '@mui/material';
import { useLoadingStatus } from 'models/Model';
import LocationDialogView from './LocationDialogView';
import { EventCreatingPresenter } from 'presenters/EventCreatingPresenter';

export default function MainContentView({ user }) {
    const [loadingTasks, addLoadingTask, clearLoadingTask] = useLoadingStatus();

    const contentFade = useRef();

    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)

    const routed = user ? (
        <Routes>
            <Route exact path="/" element={<WelcomeView />} />
            <Route path="/">
                <Route
                    path="event/:eventId"
                    element={<EventDetailsPresenter user={user} />}
                >
                    <Route
                        path="map"
                        element={<LocationDialogView user={user} />}
                    />
                </Route>

                <Route
                    path="events"
                    element={
                        <EventListPresenter
                            user={user}
                        />
                    }
                >
                    <Route
                        path="create"
                        element={
                            <EventCreatingPresenter
                                user={user}
                                onSubmit={() => {
                                    /* do stuff*/
                                }}
                            />
                        }
                    ></Route>
                </Route>

                <Route
                    path="carregistration"
                    element={<CarRegistrationPresenter user={user} />}
                />

                <Route path="welcome" element={<WelcomeView />} />
            </Route>
        </Routes>
    ) : (
        <WelcomeView />
    );

    return (
        <div className="h-auto w-[60rem] overflow-y-auto rounded-tr-md bg-sideandmain-200 p-16">
            <Fade in={loadingTasks.length !== 0}>
                <CircularProgress
                    sx={{
                        position: 'absolute',
                        left: 'calc(50% - 2rem)',
                    }}
                    thickness={3}
                    size="4rem"
                />
            </Fade>
            <Fade
                ref={contentFade}
                in={loadingTasks.length === 0}
            >
                <div>{routed}</div>
            </Fade>
        </div>
    );
}
