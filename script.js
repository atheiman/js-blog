var DEBUG = true;
var contentDiv = document.getElementById('content');


function debug(logString) {
    if (DEBUG)
        console.log('DEBUG: ' + logString);
}


function setContent(src) {
    var src = location.hash.slice(1);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            contentDiv.innerHTML=xmlhttp.responseText;
        }
    };
    xmlhttp.open("GET",config.postsDir + "/" + src + "?t=" + Math.random(),true);
    xmlhttp.send();
    debug('AJAX request sent to ' + src);
}


window.onhashchange = function () {
    debug('hash changed to ' + location.hash);
    setContent();
}

if (location.hash)
    setContent();
