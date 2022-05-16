import React, { FC, useState } from 'react';
import LocationFormView from '../views/LocationFormView';

export type Place = {
    name: string;
};

type LocationFormPresenterProps = object;

const LocationFormPresenter: FC = (props: LocationFormPresenterProps) => {
    const [options, setOptions] = useState([{name: "a"}]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle user typing
    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }
        setLoading(true);

        (async () => {
            if (active) {
                await new Promise((resolve) => {
                    setTimeout(resolve, 2000);
                });
                setLoading(false);
            }
        })();

        return () => {
            active = false;
        };
    }, [inputValue]);

    return <LocationFormView options={options} />;
};

export default LocationFormPresenter;
