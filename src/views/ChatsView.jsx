import { Button, TextField, ListSubheader } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { palette } from '@mui/system';

function Item({ theme, sender }) {
    return (
        <div className="bg-primary">
            <span>some text</span>
        </div>
    );
}

export default function ChatsView() {
    var test;
    function test2(e) {
        return null;
    }
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return (
        <div className="bottom-0 right-0 flex justify-start bg-slate-300 fixed">
            <div className="bg-slate-300">
                <div>
                    <div className="child:w-6 child:h-6 flex justify-center flex-row w-auto h-auto">
                        <img src="Logotype.png" alt="" />
                        <h5>Eric</h5>
                    </div>
                    <Box className="bg" sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={1}>
                            <Grid item xs={8}>
                                <Item sender="other">xs=8</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>xs=4</Item>
                            </Grid>
                            <Grid item sender="other" xs={4}>
                                <Item>xs=4</Item>
                            </Grid>
                            <Grid item xs={8}>
                                <Item>xs=8</Item>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
                <TextField id="" label="" value={test} onChange={test2} />
            </div>

            <div className="child:w-6 child:h-6 flex justify-start flex-col-reverse w-auto h-auto ">
                <img src="Logotype.png" alt="" />
                <img src="Logotype.png" alt="" />
                <img src="Logotype.png" alt="" />
                <img src="Logotype.png" alt="" />
                <img src="Logotype.png" alt="" />
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
