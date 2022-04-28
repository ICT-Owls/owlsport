import { Button, TextField, ListSubheader, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { palette } from '@mui/system';

function Item({ sender }) {
    return (
        <div
            className={
                'flex' +
                (sender == 'other'
                    ? ' justify-start child:bg-primary-300'
                    : ' justify-end child:bg-secondary-100')
            }
        >
            <span className="w-auto p-0.5 pb-1 m-0.5 rounded-full text-xl">
                some text
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
        <div className="bottom-0 right-0 flex justify-start fixed">
            <div className="m-3 flex justify-end flex-col w-fit">
                <div className="bg-primary-200 rounded-xl border-secondary-100 border-2 mb-2 w-96">
                    <div className="child:w-14 child:h-14 flex justify-center flex-row w-auto h-auto">
                        <img src="Logotype.png" alt="" />
                        <h5>Eric</h5>
                    </div>
                    <Divider variant="middle" className="bg-secondary-200" />
                    <div className="h-auto overflow-y-auto max-h-[50vh]">
                        <Item></Item>
                        <Item sender="other"></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item sender="other"></Item>
                        <Item sender="other"></Item>
                        <Item sender="other"></Item>
                        <Item></Item>
                        <Item sender="other"></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item sender="other"></Item>
                        <Item sender="other"></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item sender="other"></Item>
                    </div>
                </div>
                <TextField
                    className="w-full max-h-72"
                    id="outlined-textarea"
                    label="Multiline Placeholder"
                    placeholder="Placeholder"
                    multiline
                />
            </div>

            <div className="child:w-14 child:h-14 flex justify-start flex-col-reverse w-auto h-auto max-h-[80vh] overflow-scroll">
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
