var contentDiv = document.getElementById('content');

window.onhashchange = function () {
    debug('hash changed to ' + location.hash);
    app.setActivePost();
}

if (location.hash)
    // On page load, set the content (if a URL was shared / put in by the user)
    app.setActivePost();
