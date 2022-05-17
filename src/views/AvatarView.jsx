import { Avatar, Skeleton, Tooltip } from '@mui/material';
import { generateAvatar } from '../helpers/Generators';
import PropTypes from 'prop-types';
import React, { useEffect, useState, MutableRefObject } from 'react';
import Show from 'helpers/Show';

export default function AvatarView({ user }) {
    const [loaded, setLoaded] = useState(false);
    const [url, setUrl] = useState(generateAvatar());
    const [name, setName] = useState(undefined);

    const imgElem = React.useRef(null);

    const sizeStyle = 'w-12 h-12';

    const onImageLoaded = () => setLoaded(true);

    useEffect(() => {
        const imgElCurrent = imgElem.current;

        if (imgElCurrent) {
            imgElCurrent.addEventListener('load', onImageLoaded);
            return () =>
                imgElCurrent.removeEventListener('load', onImageLoaded);
        }
    }, [imgElem]);

    useEffect(() => {
        if (user) setName(user.firstName + ' ' + user.lastName);
    }, [user]);

    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return (
        <>
            <img ref={imgElem} src={url} className="m-0 hidden h-0 w-0 p-0" />
            <Tooltip title={name ? name : ''}>
                <div>
                    <Skeleton
                        className={sizeStyle}
                        variant="circular"
                        sx={{ display: (loaded ? 'none' : 'block') }}
                    />

                    <Avatar sx={{ display: (loaded ? 'block' : 'none') }} className={sizeStyle} alt={name} src={url} />
                </div>
            </Tooltip>
        </>
    );
}

AvatarView.propTypes = {
    user: PropTypes.object,
};
