import { generateEvent, randomInt } from '../helpers/Generators';
import EventListView from '../views/EventListView';
export default function EventListPresenter(props) {
    const events = [];
    for (var i = 0; i < 12 + randomInt(20); i++) {
        events.push(generateEvent());
    }

    // Hooks, logic, etc goes here. These presenters manipulate data, transform it into usable functions and values, then passes those to a view.
    // No visual code here.
    return EventListView({ events: events });
}
