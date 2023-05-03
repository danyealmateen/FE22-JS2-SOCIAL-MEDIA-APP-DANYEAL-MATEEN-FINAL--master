import { getUsers } from "../getUsers/getUsers";
import { statusUpdatesContainer } from "../globals/globals";
import moment from 'moment'

var currentTime = moment.utc();
console.log(currentTime);


async function displayAllStatusUpdates() {

    let allMessages = []

    const userData = await getUsers();

    statusUpdatesContainer.innerHTML = "";

    for (const username in userData) {
        const statusUpdate = userData[username].statusUpdates;

        for (const key in statusUpdate) {
            let message = statusUpdate[key];

            let messageObj = {
                username: username,
                message: message.message,
                timestamp: moment(message.timestamp),
            }
            allMessages.push(messageObj)
        }
    }
    allMessages.sort(function (a, b) {
        return b.timestamp.diff(a.timestamp);
    });

    for (const key in allMessages) {
        let message = allMessages[key];

        const statusUpdateElement = document.createElement('p');
        statusUpdateElement.innerHTML = `${message.username}:<br> ${message.message}<br> ${message.timestamp}<br>`
        statusUpdatesContainer?.appendChild(statusUpdateElement)
    }
}

export { displayAllStatusUpdates }