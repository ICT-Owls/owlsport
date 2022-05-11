import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatsPresenter from '../presenters/ChatsPresenter';
import EventListPresenter from '../presenters/EventListPresenter';
import MainContentContainer from '../components/MainContentContainer';
import EventDetailsPresenter from '../presenters/EventDetailsPresenter';

export default function MainContentView({ user }) {
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return user ? (
        <MainContentContainer>
            <Routes>
                <Route
                    path="/event/:eventId"
                    element={<EventDetailsPresenter user={user} />}
                />
                <Route
                    path="/events"
                    element={<EventListPresenter user={user} />}
                />
                <Route path="/" element={<ChatsPresenter />} />
            </Routes>
        </MainContentContainer>
    ) : (
        <h1>Not logged in</h1>
    );
}
