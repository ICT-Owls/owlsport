import { Button } from '@mui/material';

export default function ChatsView() {
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return (
        <div class="chat-popup" id="myForm">
            <form action="/action_page.php" class="form-container">
                <h1>Chat</h1>

                <label for="msg">
                    <b>Message</b>
                </label>
                <textarea
                    placeholder="Type message.."
                    name="msg"
                    required
                ></textarea>

                <button type="submit" class="btn">
                    Send
                </button>
                <button type="button" class="btn cancel" onclick="closeForm()">
                    Close
                </button>
            </form>
        </div>
    );
}
