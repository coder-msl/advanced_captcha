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
        console.log("Biblioteka gotowa do użycia");
    });

    $(`
        <div id="ex1" class="modal">
            <p>Thanks for clicking. That felt good.</p>
            <a href="#" rel="modal:close">Close</a>
        </div>
    `)
    .appendTo("body")
    .modal();


    $("#copyButton").on("click", function () {
        navigator.clipboard.writeText("Hello World")
            .then(() => {
                console.log("Skopiowano");
            })
            .catch(err => {
                console.error(err);
            });
    });
})