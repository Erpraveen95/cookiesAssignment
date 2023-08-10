const cookieForm = document.getElementById('cookieForm');
const createCookieButton = document.getElementById('createCookie');
const deleteCookieButton = document.getElementById('deleteCookie');
const retrieveCookieButton = document.getElementById('retrieveCookie');
const cookieNameInput = document.getElementById('cookieName');
const cookieValueInput = document.getElementById('cookieValue');
const messageList = document.getElementById('msg');

cookieForm.addEventListener('submit', createCookie);

function createCookie(e) {
    e.preventDefault();

    const cookieName = cookieNameInput.value;
    const cookieValue = cookieValueInput.value;
    setCookie(cookieName, cookieValue, 7); // Set a cookie for 7 days

    showMessage(`Cookie "${cookieName}" created`);

}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log(document.cookie)
}
// Function to get a cookie by name
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    console.log("decoded cookie", decodedCookie)
    let ca = decodedCookie.split(';');
    console.log('ca', ca)
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//delete cookie
deleteCookieButton.addEventListener('click', () => {

    const name = cookieNameInput.value;
    const cookieExists = getCookie(name);
    if (cookieExists !== "") {
        const value = getCookie(name);
        localStorage.setItem('deletedCookieName', name);
        localStorage.setItem('deletedCookieValue', value);
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        showMessage(`Cookie "${name}" deleted and data stored in local storage.`);
    } else {
        showMessage(`Cookie does not exist.`);
    }
});

retrieveCookieButton.addEventListener('click', () => {
    const name = localStorage.getItem('deletedCookieName');
    const value = localStorage.getItem('deletedCookieValue');
    if (name && value) {
        document.cookie = `${name}=${value}`;
        localStorage.removeItem('deletedCookieName');
        localStorage.removeItem('deletedCookieValue');
        showMessage(`Cookie "${name}" retrieved and restored.`);
    } else {
        showMessage('No deleted cookie data found in local storage.');
    }
});


function showMessage(message) {
    messageList.innerHTML = ''
    const messageItem = document.createElement('li');
    messageItem.textContent = message;
    messageList.appendChild(messageItem);
}
