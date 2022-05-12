import React from 'react';
import RequiresCarpoolingView from '../views/RequiresCarpoolingView';
export default function RequiresCarpoolingPresenter({
    requiresCarpooling,
    setCarpooling,
}) {
    const submit = (carpool, address) => {
        if (carpool) {
            setCarpooling(true, {
                longtitude: 0,
                latitude: 0,
                address,
            });
        } else {
            setCarpooling(false, undefined);
        }
    };

    return RequiresCarpoolingView({
        requiresCarpooling,
        submit,
    });
}
