//form submet default is prevented at displayUserMessage()
const fakeEvent = new Event("submit", { bubbles: true, cancelable: true }); //fake event for ctrl+enter submition
const hideTheirs = document.querySelectorAll("header, main");
const form = document.getElementById("inputForm");
const textarea = document.getElementById("userInput");
const chatContainer = document.getElementById("chatContainer");
const submitBtn = document.getElementById("submitBtn");
const main = document.querySelector("main");
const scrollBtn = document.getElementById("scrollBtn");

let inputAvailable = false; //if the textarea have a value to input
let emptyChat = true;
let sendAllowed = true; // to prevent sending before response

document.getElementById("newChat").addEventListener("click", newChat);
document.getElementById("copyBtn").addEventListener("click", copyChat);
document.getElementById("toggleTheme").addEventListener("change", toggleTheme);
textarea.addEventListener("input", adjustHeightAndValueState);
document.addEventListener("keydown", handleEnter);
form.addEventListener("submit", displayUserMessage);
main.addEventListener("scroll", showScrollBtn);
scrollBtn.addEventListener("click", scrollToBottom);

function newChat() {
    document.cookie =
        "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.reload();
}
function copyChat() {
    const Msgs = document.querySelectorAll("#chatContainer > *");
    const separative =
        "\n\n####################################PPLO-GPT####################################\n\n";
    let copied = "";
    for (let msg of Msgs) {
        if (msg.classList.contains("user")) {
            copied += "User:\n" + msg.textContent + separative;
        } else if (msg.classList.contains("bot")) {
            copied += "PPLO GPT:\n" + msg.textContent + separative;
        }
    }
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
            .writeText(copied)
            .then(() => {
                //success
            })
            .catch((err) => {
                // err
            });
    } else {
        //if the clipboard API is blocked
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = copied;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextArea);
    }
}
function toggleTheme(event) {
    const head = document.head;
    function burryBugs() {
        function hide() {
            hideTheirs.forEach((element) => {
                element.classList.toggle("hide");
            });
        }
        hide();
        setTimeout(() => {
            hide();
        }, 255);
    }
    if (event.target.checked) {
        head.appendChild(
            Object.assign(document.createElement("link"), {
                rel: "stylesheet",
                href: "style/light.css",
            })
        );
        burryBugs();
    } else {
        document.querySelector(`link[href="style/light.css"]`).remove();
        burryBugs();
    }
}
function adjustHeightAndValueState() {
    // updating the input value and activate the submit btn visually
    const trimmedValue = textarea.value.trim();
    if (trimmedValue == "" && inputAvailable) {
        inputAvailable = false;
        if (submitBtn.classList.contains("active")) {
            submitBtn.classList.remove("active");
        }
    } else if (trimmedValue != "" && !inputAvailable) {
        inputAvailable = true;
        if (!submitBtn.classList.contains("active")) {
            submitBtn.classList.add("active");
        }
    }
    //adjusting height
    textarea.style.height = "auto"; // to allow shrink
    textarea.style.height = `${this.scrollHeight}px`; //extends it till the max-height in css (22dvh)
}
function handleEnter(event) {
    if (
        event.key === "Enter" &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.metakey
    ) {
        const activeElement = document.activeElement;

        if (activeElement && activeElement === textarea) {
            displayUserMessage(fakeEvent);
            event.preventDefault();
        }
    }
}
//user createMesage to create the bot response message also ####### // the source parameter is "bot" or "user"
function displayMessage(source, content) {
    // source can be "bot" or "user" only
    const newMessage = document.createElement("div");
    newMessage.innerText = content;
    newMessage.classList.add("message", `${source}`);
    chatContainer.appendChild(newMessage);
    scrollToBottom();
}
function displayUserMessage(event) {
    event.preventDefault();
    if (sendAllowed && inputAvailable) {
        const placeholder = document.getElementById("placeholder");
        const content = textarea.value;
        textarea.value = "";
        if (emptyChat) {
            setTimeout(() => {
                placeholder.style.display = "none";
            }, 501);
            placeholder.style.opacity = "0";
            emptyChat = false;
        }
        displayMessage("user", content);
        sendAllowed = false;
        adjustHeightAndValueState();
        textarea.focus();
        //remove fakeResponse()
        fakeResponse();
    }
}
function scrollToBottom() {
    main.scrollTop = main.scrollHeight;
}
function showScrollBtn() {
    const distanceToTop = main.scrollTop + main.clientHeight;
    const scrollHeight = main.scrollHeight - 100;

    if (
        distanceToTop < scrollHeight &&
        !scrollBtn.classList.contains("active")
    ) {
        scrollBtn.classList.add("active");
    } else if (
        distanceToTop > scrollHeight &&
        scrollBtn.classList.contains("active")
    ) {
        scrollBtn.classList.remove("active");
    }
}

//remove fakeResponse() except its last line, !!! keep it !!!
function fakeResponse() {
    fakeText1 =
        "صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ ";
    fakeText2 =
        "loremLorem ipsum dolor sit amet consectetur adipisicing elit. Dolor tenetur necessitatibus architecto quibusdam officiis ullam tempore. Aut placeat sunt veritatis consectetur, mollitia molestiae ab iusto et praesentium qui ea eligendi!";
    const randomIndex = Math.floor(Math.random() * 2);
    setTimeout(() => {
        if (randomIndex === 0) {
            displayMessage("bot", fakeText1);
        } else {
            displayMessage("bot", fakeText2);
        }
        sendAllowed = true; // to re-Allow sending after response
    }, 500);
}
