import React, { FC } from 'react';
import { GooglePlace, usePlaceCompletion } from '../helpers/Location';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete, {
    AutocompleteChangeReason,
} from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { Place } from 'api-client';

type LocationFormViewProps = {
    value?: GooglePlace | null;
    setValue?: (newValue: GooglePlace | null) => void;
    textInput?: string;
    setTextInput?: (newValue: string) => void;
};

const LocationFormView: FC<LocationFormViewProps> = (
    props: LocationFormViewProps
) => {
    const [value, setValue] = React.useState<Place | null>(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState<readonly Place[]>([]);
    const placeCompletion = usePlaceCompletion();

    React.useEffect(() => {
        let active = true;

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        placeCompletion(inputValue, (results?: readonly Place[]) => {
            if (active) {
                let newOptions: readonly Place[] = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, placeCompletion]);

    React.useEffect(() => {
        props.setValue?.(
            value &&
                value?.description &&
                value?.description !== props.value?.description && // TODO: Ugly way of dealing with bad infinite loop
                value?.structuredFormatting?.mainText &&
                value?.structuredFormatting?.mainText !== 'reverse geocoding'
                ? {
                      description: value.description,
                      main_text: value.structuredFormatting.mainText,
                      secondary_text: value?.structuredFormatting.secondaryText,
                  }
                : null
        );
    }, [value]);

    React.useEffect(() => {
        if (
            !props.value ||
            value?.description === props.value?.description // TODO: Ugly way of dealing with bad infinite loop
        )
            return;

        const translatedValue = {
            description: props.value.description,
            structuredFormatting: {
                mainText: props.value.main_text,
                secondaryText: props.value.secondary_text,
            },
        };

        setOptions(
            translatedValue &&
                options.every(
                    (v) => v.description !== translatedValue.description
                )
                ? [translatedValue, ...options]
                : options
        );

        setValue?.(translatedValue);
    }, [props.value]);

    return (
        <div className="bg-background-100">
            <Autocomplete
                id="google-map-demo"
                getOptionLabel={(option) =>
                    typeof option === 'string' ? option : option.description
                }
                filterOptions={(x) => x}
                options={options}
                autoComplete
                includeInputInList
                filterSelectedOptions
                value={value}
                onChange={(
                    event: any,
                    newValue: Place | null,
                    reason: AutocompleteChangeReason
                ) => {
                    setOptions(newValue ? [newValue, ...options] : options);
                    if (reason === 'selectOption') setValue(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Add a location" fullWidth />
                )}
                renderOption={(props, option) => {
                    const matches =
                        option.structuredFormatting.mainTextMatchedSubstrings;
                    if (!matches) return;
                    const parts = parse(
                        option.structuredFormatting.mainText,
                        matches.map((match: any) => [
                            match.offset,
                            match.offset + match.length,
                        ])
                    );

                    return (
                        <li {...props}>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Box
                                        component={LocationOnIcon}
                                        sx={{ color: 'text.secondary', mr: 2 }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    {parts.map((part, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                fontWeight: part.highlight
                                                    ? 700
                                                    : 400,
                                            }}
                                        >
                                            {part.text}
                                        </span>
                                    ))}
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {
                                            option.structuredFormatting
                                                .secondaryText
                                        }
                                    </Typography>
                                </Grid>
                            </Grid>
                        </li>
                    );
                }}
            />
        </div>
    );
};

export default LocationFormView;
