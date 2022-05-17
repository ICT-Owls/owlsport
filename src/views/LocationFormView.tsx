import React, { FC } from 'react';
import {
    GooglePlace,
    usePlaceCompletion,
    PlaceType,
} from '../helpers/Location';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete, {
    AutocompleteChangeReason,
} from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';


type LocationFormViewProps = {
    value?: GooglePlace | null;
    setValue?: (newValue: GooglePlace | null) => void;
    textInput?: string;
    setTextInput?: (newValue: string) => void;
};

const LocationFormView: FC<LocationFormViewProps> = (
    props: LocationFormViewProps
) => {
    const [value, setValue] = React.useState<PlaceType | null>(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
    const placeCompletion = usePlaceCompletion();

    React.useEffect(() => {
        let active = true;

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        placeCompletion(
            { input: inputValue },
            (results?: readonly PlaceType[]) => {
                if (active) {
                    let newOptions: readonly PlaceType[] = [];

                    if (value) {
                        newOptions = [value];
                    }

                    if (results) {
                        newOptions = [...newOptions, ...results];
                    }

                    setOptions(newOptions);
                }
            }
        );

        return () => {
            active = false;
        };
    }, [value, inputValue, placeCompletion]);

    React.useEffect(() => {
        props.setValue?.(
            value &&
                value?.description &&
                value?.structured_formatting?.main_text
                ? {
                      description: value.description!,
                      main_text: value.structured_formatting.main_text!,
                      secondary_text:
                          value?.structured_formatting.secondary_text,
                  }
                : null
        );
    }, [value]);

    return (
        <div className="bg-background-100">
            <Autocomplete
                id="google-map-demo"
                sx={{ width: 300 }}
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
                    newValue: PlaceType | null,
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
                        option.structured_formatting
                            .main_text_matched_substrings;
                    if (!matches) return;
                    const parts = parse(
                        option.structured_formatting.main_text,
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
                                            option.structured_formatting
                                                .secondary_text
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
