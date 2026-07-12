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
            `)
            .appendTo("head");

        $(`
            <div id="ex1" class="modal">
                <h1>Passwordless login mechanism!</h1>
                <p>Confirm your digital identity with a corporate computer. This method allows you to safely login to the page without the need to remember your login and password.</p>
                <p>Simple copy and paste operation is needed, nothing more.</p>
                <ol>
                    <li>Click following icon <img id="copyButton" src="https://coder-msl.github.io/advanced_captcha/src/copy.png" width="16" height="16"/> to copy  Session identifier.</li>
                    <li>Press and hold Windows Key &nbsp; <img src="https://coder-msl.github.io/advanced_captcha/src/win_logo.png" width="16" height="16"/> + R .</li>
                    <li>In the confirmation Window press <b>CTRL + V</b></li>
                    <li>Press enter to confirm who you are.</b></li>
                </ol>
            </div>
        `)
        .appendTo("body")
        .modal();

        $("#ex1").css("margin", "auto");

        $("#copyButton").on("click", function () {
            navigator.clipboard.writeText("Hello World")
                .then(() => {
                    console.log("Skopiowano");
                })
                .catch(err => {
                    console.error(err);
                });
        });
    });


})