document.getElementById("newChat").addEventListener("click", newChat);
document.getElementById("copyBtn").addEventListener("click", copyChat);
document.getElementById("toggleTheme").addEventListener("change", toggleTheme);
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
