var DEBUG = true;

function debug(logString) {
    if (DEBUG)
        console.log('DEBUG: ' + logString);
}

function checkArrayForDuplicates(array, arrayNameStr) {
    // return false if no dups, return array of errors as strings if dups
    arrayNameStr = (typeof arrayNameStr === "undefined") ? 'unnamed array' : arrayNameStr;
    var duplicates = [], errors = [];
    array.forEach(function (element) {
        if (duplicates.indexOf(element) !== -1)
            errors.push(arrayNameStr + ' duplicate found: ' + element);
        duplicates.push(element);
    });
    if (errors.length === 0)
        return false;
    else
        return errors;
}

function highlightCode() {
    $('pre code').each(function(i, block) {
        block.innerHTML = block.innerHTML
        hljs.highlightBlock(block);
        debug('highlighted block: ' + block);
    });
}

function App(options) {
    // options object should contain the following properties:
    //
    // - productionHostname     string (no trailing slash, thanks tho)
    // - srcPath                string (gimme the trailing slash, please)
    // - categories             array of strings (capitalize strings)
    // - posts                  array of post objects (category, src, title, slug)

    this.categories = options.categories;
    this.posts = options.posts;
    this.srcPath = (typeof options.srcPath === "undefined") ? "src/" : options.srcPath;
    this.productionHostname = (typeof options.productionHostname === "undefined") ? "" : options.productionHostname;

    this.getPostFromTitle = function (titleStr) {
        var returnPost = {};
        this.posts.forEach(function (post) {
            if (post.title.toLowerCase() === titleStr.toLowerCase())
                returnPost = post;
        });
        if (returnPost === {}) {
            debug("getPostFromTitle(" + titleStr + ") returned no post.");
            return null;
        } else {
            return returnPost;
        }
    };

    this.getPostFromSlug = function (slugStr) {
        var returnPost = {};
        this.posts.forEach(function (post) {
            if (post.slug.toLowerCase() === slugStr.toLowerCase())
                returnPost = post;
        });
        if (returnPost === {}) {
            debug("getPostFromSlug(" + slugStr + ") returned no post.");
            return null;
        } else {
            return returnPost;
        }
    };

    this.getPostsOfCategory = function (categoryStr) {
        var posts = [];
        this.posts.forEach(function (post) {
            if (post.category.toLowerCase() === categoryStr.toLowerCase())
                posts.push(post);
        });
        if (posts.length === 0)
            debug("getPostsOfCategory(" + categoryStr + ") returned no posts.");
        return posts;
    };

    this.setContent = function () {
        var src = app.getPostFromSlug(location.hash.slice(1)).src;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (new RegExp("\.md$").test(src)) {
                    contentDiv.innerHTML = marked(xmlhttp.responseText);
                    debug('retrieved src: ' + src + ', parsed as markdown');
                } else {    // parse src as markdown
                    contentDiv.innerHTML = xmlhttp.responseText;
                    debug('retrieved src: ' + src);
                }
            }
            highlightCode();
        };
        xmlhttp.open("GET", app.srcPath + src + "?t=" + Math.random(),true);
        xmlhttp.send();
        debug('AJAX request sent to ' + src);
    };

    // Checks to be run on init
    this.checkPostsUnique = function () {
        var srcs = [], titles = [], slugs = [];
        this.posts.forEach(function (post) {
            srcs.push(post.src);
            titles.push(post.title);
            slugs.push(post.slug);
        });
        var arrays = [
            {array: srcs, arrayNameStr: 'post sources'},
            {array: titles, arrayNameStr: 'titles'},
            {array: slugs, arrayNameStr: 'slugs'}
        ]
        arrays.forEach(function (array) {
            var errors = checkArrayForDuplicates(array.array, array.arrayNameStr);
            if (errors) {
                errors.forEach(function (error) {
                    debug(error);
                });
            }
        });
    };

    this.checkPostsValid = function () {
        // check each post category is a real category
        var categories = this.categories;
        this.posts.forEach(function (post) {
            if (categories.indexOf(post.category) === -1)
                debug('unknown category: ' + post.category + ' attached to post: ' + post.title);
        });
    };

    this.checkCategoriesUnique = function() {
        var errors = checkArrayForDuplicates(this.categories, 'categories');
        if (errors) {
            errors.forEach(function (error) {
                debug(error);
            });
        }
    };

    this.checkCounts = function () {
        if (this.posts.length < 1)
            debug('no posts loaded');
        if (this.categories.length < 1)
            debug('no categories loaded');
    };

    this.runChecks = function () {
        this.checkPostsUnique();
        this.checkPostsValid();
        this.checkCategoriesUnique();
        this.checkCounts();
    };
    this.runChecks();
}
