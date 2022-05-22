import React, { useEffect } from 'react';
import { Route, Router, Routes, useHref, useRoutes } from 'react-router-dom';
import ChatsPresenter from '../presenters/ChatsPresenter';
import EventListPresenter from '../presenters/EventListPresenter';
import MainContentContainer from '../components/MainContentContainer';
import EventDetailsPresenter from '../presenters/EventDetailsPresenter';
import CarRegistrationPresenter from '../presenters/CarRegistrationPresenter';
import LocationFormPresenter from 'presenters/LocationFormPresenter';
import MapInputPresenter from 'presenters/MapInputPresenter';
import { Box } from '@mui/system';
import WelcomeView from './WelcomeView';

export default function MainContentView({ user }) {
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return user ? (
        <div className="h-auto w-[60rem] overflow-y-auto rounded-tr-md bg-sideandmain-200 p-5">
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
        </div>
    ) : (
        <WelcomeView />
    );
}
