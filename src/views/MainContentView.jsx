import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import EventListPresenter from '../presenters/EventListPresenter';
import EventDetailsPresenter from '../presenters/EventDetailsPresenter';
import CarRegistrationPresenter from '../presenters/CarRegistrationPresenter';
import MapInputPresenter from 'presenters/MapInputPresenter';
import WelcomeView from './WelcomeView';
import { CircularProgress } from '@mui/material';
import { useLoadingStatus } from 'models/Model';

export default function MainContentView({ user }) {
    const [loadingTasks, addLoadingTask, clearLoadingTask] = useLoadingStatus();

    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)

    const routed = user ? (
        <Routes>
            <Route
                path="/event/:eventId"
                element={<EventDetailsPresenter user={user} />}
            />

            <Route
                path="/events"
                element={<EventListPresenter user={user} />}
            />

            <Route
                path="/carregistration"
                element={<CarRegistrationPresenter user={user} />}
            />
            <Route path="/whatever" element={<MapInputPresenter />} />

            <Route path="/" element={<EventListPresenter user={user} />} />

            <Route path="/welcome" element={<WelcomeView />} />
        </Routes>
    ) : (
        <WelcomeView />
    );

    return (
        <div className="h-auto w-[60rem] overflow-y-auto rounded-tr-md bg-sideandmain-200 p-16">
            <CircularProgress
                sx={{
                    position: 'absolute',
                    left: 'calc(50% - 3rem)',
                    display: (loadingTasks.length!==0) ? 'block' : 'none',
                }}
                thickness={4}
                size="6rem"
            />
            {routed}
        </div>
    );
}
