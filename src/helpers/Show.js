//This is a small presenter that conditionally displays its children or some placeholder. This can be used to implement a variety of things such as
//loadingscreens and whatnot.
//show: boolean value which determines if children should be shown.
//showThis: something that is showed if show is false, if showThis does not exist then false is returned (nothing is rendered).
//children: standard JS prop passed to all components, Show returns its children if show is true.
function Show({ show, showThis, children }) {
    return show ? children : showThis ? showThis : false;
}
export default Show;
