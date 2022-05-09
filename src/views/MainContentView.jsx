import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatsPresenter from '../presenters/ChatsPresenter';
import EventListPresenter from '../presenters/EventListPresenter';
import MainContentContainer from '../components/MainContentContainer';

export default function MainContentView(props) {
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return (
        <MainContentContainer>
            <Routes>
                <Route
                    path="/events"
                    element={<EventListPresenter user={props.user} />}
                />
                <Route path="/" element={<ChatsPresenter />} />
            </Routes>
        </MainContentContainer>
    );
}
