import React from 'react';
import RequiresCarpoolingView from 'views/RequiresCarpoolingView';
export default function RequiresCarpoolingPresenter({
    requiresCarpooling,
    setCarpooling,
    isDriver,
}) {
    const submit = (carpool, location, seats) => {
        if (carpool) {
            setCarpooling(true, location, seats);
        } else {
            setCarpooling(false, undefined, seats);
        }
    };

    return RequiresCarpoolingView({
        requiresCarpooling,
        submit,
        isDriver,
    });
}
