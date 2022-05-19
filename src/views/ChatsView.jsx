import { Divider, TextField } from '@mui/material';
import AvatarPresenter from 'presenters/AvatarPresenter';
import React from 'react';
import { generateAvatar } from '../helpers/Generators';

function Item({ sender, content }) {
    return (
        <div
            className={
                'flex' +
                (sender == 'other'
                    ? ' justify-start child:bg-secondary-100'
                    : ' justify-end child:bg-primary-100')
            }
        >
            <span className="m-4 w-auto max-w-full break-words rounded-2xl p-2 pb-3 text-xl">
                {content}
            </span>
        </div>
    );
}

function ChatSelection() {
    return <AvatarPresenter />;
}
export default function ChatsView() {
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return (
        <div className="fixed bottom-5 right-5 flex justify-start">
            <div className="m-3 flex w-fit flex-col justify-end">
                <div className="w-96 rounded-xl border-2 border-secondary-100 bg-background-100 shadow-md outline-double outline-1 outline-background-200">
                    <div className="flex h-auto w-auto flex-row items-center justify-start px-10 pt-3 child:w-14">
                        <AvatarPresenter />
                        <h2 className="h-fit">Eric</h2>
                    </div>
                    <Divider variant="middle" className="bg-secondary-100" />
                    <div className="h-auto max-h-[50vh] overflow-y-auto scrollbar-thin">
                        <Item content="test"></Item>
                        <Item content="test" sender="other"></Item>
                        <Item content="test"></Item>
                        <Item content="test"></Item>
                        <Item content="test"></Item>
                        <Item content="test"></Item>
                        <Item content="test" sender="other"></Item>
                        <Item content="test" sender="other"></Item>
                        <Item content="test" sender="other"></Item>
                        <Item content="test"></Item>
                        <Item content="test" sender="other"></Item>
                        <Item content="test"></Item>
                        <Item content="test"></Item>
                        <Item content="test" sender="other"></Item>
                        <Item content="test" sender="other"></Item>
                        <Item content="test"></Item>
                        <Item content="test"></Item>
                        <Item content="test"></Item>
                        <Item content="test"></Item>
                        <Item content="test"></Item>
                        <Item
                            content="also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                            sender="other"
                        ></Item>
                    </div>
                </div>
                <TextField
                    className="max-h-72 w-full rounded-md bg-slate-100 bg-opacity-80"
                    id="outlined-textarea"
                    label="Multiline Placeholder"
                    placeholder="Placeholder"
                    multiline
                />
            </div>

            <div className="flex h-auto max-h-[65vh] w-auto flex-col justify-start self-end overflow-scroll scrollbar overflow-x-hidden scrollbar-track-primary-100 child:h-14 child:w-14">
                <ChatSelection />
                <ChatSelection />
                <ChatSelection />
                <ChatSelection />
                <ChatSelection />
                <ChatSelection />
                <ChatSelection />
                <ChatSelection />
                <ChatSelection />
                <ChatSelection />
                <ChatSelection />
                <ChatSelection />
                <ChatSelection />
                <ChatSelection />
                <ChatSelection />
                <ChatSelection />
                <ChatSelection />
            </div>
        </div>
        // <div class="chat-popup" id="myForm">
        //     <form action="/action_page.php" class="form-container">
        //         <h1>Chat</h1>

        //         <label for="msg">
        //             <b>Message</b>
        //         </label>
        //         <textarea
        //             placeholder="Type message.."
        //             name="msg"
        //             required
        //         ></textarea>

        //         <button type="submit" class="btn">
        //             Send
        //         </button>
        //         <button type="button" class="btn cancel" onclick="closeForm()">
        //             Close
        //         </button>
        //     </form>
        // </div>
    );
}
