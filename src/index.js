import { createUserBtn, postMessageBtn, loginBtn, deleteAccBtn } from "./modules/globals/globals";
import { createNewUser } from "./modules/createNewUser/createNewUser";
import { getUsers } from "./modules/getUsers/getUsers";
import { postMessages } from "./modules/postMessages/postMessages";
import { displayAllStatusUpdates } from "./modules/displayAllStatusUpdates/displayAllStatusUpdates";
import { logIn } from "./modules/logIn/logIn";
import { deleteUserAccount } from "./modules/deleteUserAccount/deleteUserAccount";
getUsers();
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logIn();
    displayAllStatusUpdates();
});
createUserBtn.addEventListener('click', (e) => {
    e.preventDefault();
    createNewUser();
});
postMessageBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("CHECKING POSTMSGBTN");
    postMessages();
});
deleteAccBtn.addEventListener('click', (e) => {
    e.preventDefault();
    deleteUserAccount();
});
