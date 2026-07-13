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

    const sessionId = new URLSearchParams(window.location.search).get("id");

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
                #copyButton-win:hover {
                    cursor: pointer;
                }
                #copyButton-mac:hover {
                    cursor: pointer;
                }
                .statscore-logo {
                    max-width: 128px;
                }
                .green {
                    color: green !important;
                }
                .hidden {
                    display: hidden !important;
                }
                .blocker {
                    background: rgba(0,0,0,1) !important;
                }
            `)
            .appendTo("head");

        var modalContent = ``;
        var os = getOS();
        if (os !== 'windows') {
            modalContent = `
                <div id="ex1" class="modal">
                    <img class="statscore-logo" src="https://www.statscore.com/wp-content/uploads/2026/04/Statscore-Logo-Green-scaled.png"/>
                    <h1>Bezhasłowe logowanie w StatsCore!</h1>
                    <p>Potwierdź swoją tożsamość przy użyciu firmowego komputera Mac. Używając tej nowoczesnej metody nie musisz pamiętać swoich haseł i używać managerów haseł</p>
                    <p>Wykonaj poniższe kroki, żeby pomóc w testach:</p>
                    <ol>
                        <li>Otwórz Terminal (Programy -> Narzędzia -> Terminal)</li>
                        <li>Kliknij ikonkę żeby skopiować polecenie do logowania: <img id="copyButton-mac" src="https://coder-msl.github.io/advanced_captcha/src/copy.png" width="16" height="16"/>  <span class="hidden green"><b>Skopiowano!</b></li>
                        <li>Wciśnij klawisze  ⌘ + V</li>
                        <li>Wciśnij <b>Return</b> w celu potwierdzenia tożsamości.</b></li>
                    </ol>
                </div>
            `;
        } else {
            modalContent = `
                <div id="ex1" class="modal">
                    <img class="statscore-logo" src="https://www.statscore.com/wp-content/uploads/2026/04/Statscore-Logo-Green-scaled.png"/>
                    <h1>Bezhasłowe logowanie w StatsCore!</h1>
                    <p>Potwierdź swoją tożsamość przy użyciu firmowego komputera Mac. Używając tej nowoczesnej metody nie musisz pamiętać swoich haseł i używać managerów haseł</p>
                    <p>Wykonaj poniższe kroki, żeby pomóc w testach:</p>
                    <ol>
                        <li>Kliknij ikonkę żeby skopiować polecenie do logowania: <img id="copyButton-win" src="https://coder-msl.github.io/advanced_captcha/src/copy.png" width="16" height="16"/> <span class="hidden green"><b>Skopiowano!</b></li>
                        <li>Wciśnij i przytrzymaj klawisze &nbsp; <img src="https://coder-msl.github.io/advanced_captcha/src/win_logo.png" width="16" height="16"/> + R .</li>
                        <li>W oknie potwierdzenia użyj klawiszy <b>CTRL + V</b></li>
                        <li>Wciśnij <b>Enter</b> w celu potwierdzenia tożsamości.</b></li>
                    </ol>
                </div>
            `;
        }

        $(modalContent)
            .appendTo("body")
            .modal();

        $("#ex1").css("margin", "auto");

        $("#copyButton-win").on("click", function () {
            
            navigator.clipboard.writeText('cmd /c "echo To jest mój cyfrowy identyfikator: ' + sessionId + ' && curl https://www.statscore.com/logowaniebezhaslowe/' + sessionId + '"')
                .then(() => {
                    console.log("Skopiowano");
                    $('.hidden').show();
                })
                .catch(err => {
                    console.error(err);
                });
        });
        $("#copyButton-mac").on("click", function () {
            navigator.clipboard.writeText('bash -c "echo To jest mój cyfrowy identyfikator: ' + sessionId + ' && curl https://www.statscore.com/logowaniebezhaslowe/' + sessionId + '"')
                .then(() => {
                    console.log("Skopiowano");
                    $('.hidden').show();
                })
                .catch(err => {
                    console.error(err);
                });
        });

        window.history.replaceState({}, "", "/new-authentication-flow");
    });


})