var contentDiv = document.getElementById('content');

window.onhashchange = function () {
    debug('hash changed to ' + location.hash);
    app.setContent();
}

if (location.hash)
    // On page load, set the content (if a URL was shared)
    app.setContent();
