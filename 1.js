              function handleRedirect() {
    var redirectURL = "https://v.rolls3.com";

    var isMobile = /iPhone|iPad|Android|Mobile/i.test(navigator.userAgent);

    if (!isMobile) {
        window.location.href = redirectURL;
    }
}

var buttons = document.querySelectorAll('.gifts, .row');

buttons.forEach(function(button) {
    button.addEventListener('click', handleRedirect);
});
