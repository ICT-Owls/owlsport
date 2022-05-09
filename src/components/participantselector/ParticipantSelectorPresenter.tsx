import React from 'react';
import ParticipantSelectorView from './ParticipantSelectorView';

export type ParticipantSelectorPresenterProps = {
    placeholderText?: string;
    buttonText?: string;
};

export default function ParticipantSelectorPresenter(
    props: ParticipantSelectorPresenterProps
) {
    const [isValid, setValid] = React.useState(false);
    return (
        <ParticipantSelectorView
            valid={isValid}
            placeholderText={props.placeholderText}
            buttonText={props.buttonText}
        />
    );
}
