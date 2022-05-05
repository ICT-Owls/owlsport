import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const LinkBehavior = React.forwardRef((props, ref) => {
    const { href, ...other } = props;
    // Map href (MUI) -> to (react-router)
    return (
        <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />
    );
});

LinkBehavior.displayName = 'Theme.js, i hope this wont break anything';

LinkBehavior.propTypes = {
    href: PropTypes.oneOfType([
        PropTypes.shape({
            hash: PropTypes.string,
            pathname: PropTypes.string,
            search: PropTypes.string,
        }),
        PropTypes.string,
    ]).isRequired,
};

export const LightTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#ec1e24',
        },
        secondary: {
            main: '#666',
        },
        background: {
            default: '#e0e0e0',
        },
    },
    components: {
        MuiLink: {
            defaultProps: {
                component: LinkBehavior,
            },
        },
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: LinkBehavior,
            },
        },
    },
});
export const DarkTheme = LightTheme;
