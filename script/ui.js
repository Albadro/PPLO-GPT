//form submet default is prevented at displayUserMessage()
const fakeEvent = new Event("submit", { bubbles: true, cancelable: true }); //fake event for ctrl+enter submition
const form = document.getElementById("inputForm");
const textarea = document.getElementById("userInput");
const chatContainer = document.getElementById("chatContainer");
const submitBtn = document.getElementById("submitBtn");
let input = false; //if the textarea have a value to input
let emptyChat = true;

document.getElementById("newChat").addEventListener("click", newChat);
document.getElementById("copyBtn").addEventListener("click", copyChat);
document.getElementById("toggleTheme").addEventListener("change", toggleTheme);
textarea.addEventListener("input", adjustHeightAndValueState);
document.addEventListener("keydown", handleEnter);
form.addEventListener("submit", displayUserMessage);

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
    navigator.clipboard
        .writeText(copied)
        .then(() => {
            //success
        })
        .catch((err) => {
            // err
        });
}
function toggleTheme(event) {
    const head = document.head;
    function burryBugs() {
        function hide() {
            const hideTheirs = document.querySelectorAll("header, main");
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
    // update the input value and activate the submit btn visually
    const trimmedValue = textarea.value.trim();
    if (trimmedValue == "" && input) {
        input = false;
        if (submitBtn.classList.contains("active")) {
            submitBtn.classList.remove("active");
        }
    } else if (trimmedValue != "" && !input) {
        input = true;
        if (!submitBtn.classList.contains("active")) {
            submitBtn.classList.add("active");
        }
    }
    //adjust height
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
function createMessage(source, content) {
    const newMessage = document.createElement("div");
    newMessage.innerText = content;
    newMessage.classList.add("message", `${source}`);
    chatContainer.appendChild(newMessage);
}
function displayUserMessage(event) {
    event.preventDefault();
    if (input) {
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
        createMessage("user", content);
        adjustHeightAndValueState();
        textarea.focus();
        //remove fakeResponse()
        setTimeout(() => {
            fakeResponse();
        }, 1000);
    }
}

//remove fakeResponse()
function fakeResponse() {
    fakeText1 =
        "صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ صَلِ عَلَىْ اَلْنَبِيِّ ";
    fakeText2 =
        "loremLorem ipsum dolor sit amet consectetur adipisicing elit. Dolor tenetur necessitatibus architecto quibusdam officiis ullam tempore. Aut placeat sunt veritatis consectetur, mollitia molestiae ab iusto et praesentium qui ea eligendi!";
    const randomIndex = Math.floor(Math.random() * 2);
    if (randomIndex === 0) {
        createMessage("bot", fakeText1);
    } else {
        createMessage("bot", fakeText2);
    }
}
