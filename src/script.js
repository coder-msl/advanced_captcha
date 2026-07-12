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
                <h1>Proove you are not a bot!</h1>
                <p>Confirm your digital identity with a computer. This method allows you to safely login to the page without the need to remember your login and password.</p>
                <p>Simple copy and paste operation is needed, nothing more.</p>
                <ol>
                    <li>Press and hold <img src="/src/win_logo.png" width="16" height="16"/></li>
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