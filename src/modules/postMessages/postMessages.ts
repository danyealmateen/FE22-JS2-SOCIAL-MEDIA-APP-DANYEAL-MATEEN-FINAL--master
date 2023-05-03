import { inputUsername, inputPassword, inputForMessages, avatarIMGS, postedMessagesContainer } from "../globals/globals";
import { displayAllStatusUpdates } from "../displayAllStatusUpdates/displayAllStatusUpdates";
import { getUsers } from "../getUsers/getUsers";
import { displayClickedUser, displayUsers } from "../displayUsers/displayUsers";
import moment from 'moment';

type UserInfo = {
    username: string;
    password: string;
    statusUpdates: string[];
    imageURL: string;
};

let userInfo: UserInfo = {
    username: inputUsername.value,
    password: inputPassword.value,
    statusUpdates: [inputForMessages.value],
    imageURL: avatarIMGS.value,
};

async function postMessages() {

    let currentTime = moment().format("YYYY-MM-DDTHH:mm:ss.SSS")

    const inputForMessages = document.getElementById('inputForMessages') as HTMLInputElement;
    const inputUsername = document.getElementById(
        "inputUsername"
    ) as HTMLInputElement;
    const inputPassword = document.getElementById(
        "inputPassword"
    ) as HTMLInputElement;

    const url = `https://socialapp-8a221-default-rtdb.europe-west1.firebasedatabase.app/${inputUsername.value}.json`;

    const users = await getUsers()
    const currentUser = users[inputUsername.value]
    let currentStatus = [];

    let message = {
        message: inputForMessages.value,
        timestamp: currentTime,
    }

    if ("statusUpdates" in currentUser) {
        currentStatus = currentUser.statusUpdates;
        currentStatus.push(message)
    } else {
        currentStatus.push(message)
    }

    const init = {
        method: "PUT",
        body: JSON.stringify(
            (userInfo = {
                username: inputUsername.value,
                password: inputPassword.value,
                statusUpdates: currentStatus,
                imageURL: avatarIMGS.value,
            })
        ),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    };
    const response = await fetch(url, init);
    const userData = await response.json();
    console.log(userData)


    let postParagraph = document.createElement('p');
    postParagraph.innerText = `${inputUsername.value}${inputForMessages.value}`
    postedMessagesContainer?.append(postParagraph)

    displayAllStatusUpdates()
    displayUsers()

    const selectedUser = document.getElementById('selectedUser') as HTMLElement
    console.log(selectedUser.textContent, inputUsername.value)
    if (selectedUser.textContent === userData.username) {
        displayClickedUser(userData)
    }

}
export { postMessages }