import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EventListPresenter from '../presenters/EventListPresenter';
export default function MainContentView() {
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return (
        <Routes>
            <Route path="/events" element={<EventListPresenter />} />
        </Routes>
    );
}
