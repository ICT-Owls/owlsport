import React, { useEffect } from 'react';
import { eventApi } from '../helpers/Firebase';
import CarRegistrationView from '../views/CarRegistrationView';

export default function CarRegistrationPresenter({ user }) {
    console.log('CarRegistrationPresenter', user);

    const [carModel, setCarModel,
        carNumber, setCarNumber,
        fromLocation, setFromLocation] = React.useState('');

    const [seatsCount, setSeatsCount] =  React.useState(1);

    const submit = () => {
        // TODO: we should create a new car and put it to the Firebase
        // Using the following parameters:
        //     carModel,
        //     carNumber,
        //     fromLocation,
        //     seatsCount
    };


    // Hooks, logic, etc goes here. These presenters manipulate data, transform it into usable functions and values, then passes those to a view.
    // No visual code here.
    return CarRegistrationView({
        /*events,*/
        carModel, setCarModel,
        carNumber, setCarNumber,
        fromLocation, setFromLocation,
        seatsCount, setSeatsCount,
        submit, user });
}
