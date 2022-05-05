import React from 'react';

import { Button, TextField, ListSubheader, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { palette } from '@mui/system';

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
            <span className="m-4 w-auto max-w-full break-words rounded-3xl p-2 pb-3 text-xl">
                {content}
            </span>
        </div>
    );
}

function ChatSelection() {
    return <img src="Logotype.png" alt="" />;
}

export default function ChatsView() {
    var test;
    function test2(e) {
        return null;
    }
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return (
        <div className="fixed bottom-0 right-0 flex justify-start">
            <div className="m-3 flex w-fit flex-col justify-end">
                <div className="mb-2 w-96 rounded-xl border-2 border-secondary-100 bg-background-100">
                    <div className="flex h-auto w-auto flex-row justify-center child:h-14 child:w-14">
                        <img src="Logotype.png" alt="" />
                        <h5>Eric</h5>
                    </div>
                    <Divider variant="middle" className="bg-secondary-100" />
                    <div className="h-auto max-h-[50vh] overflow-y-auto">
                        <Item content="test"></Item>
                        <Item content="test" sender="other"></Item>
                        <Item content="test"></Item>
                        <Item content="test"></Item>
                        <Item content="test"></Item>
                        <Item content="test"></Item>
                        <Item content="test"></Item>
                        <Item content="test"></Item>
                        <Item content="test"></Item>
                        <Item content="test"></Item>
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
                    className="max-h-72 w-full"
                    id="outlined-textarea"
                    label="Multiline Placeholder"
                    placeholder="Placeholder"
                    multiline
                />
            </div>

            <div className="flex h-auto max-h-[80vh] w-auto flex-col-reverse justify-start overflow-scroll child:h-14 child:w-14">
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
