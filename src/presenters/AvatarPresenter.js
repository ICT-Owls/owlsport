import { generateMember } from '../helpers/Generators';
import AvatarView from '../views/AvatarView';
export default function AvatarPresenter(props) {
    // Get user object from the user id
    const user = generateMember();

    // Hooks, logic, etc goes here. These presenters manipulate data, transform it into usable functions and values, then passes those to a view.
    // No visual code here.
    return AvatarView({ user: user });
}
