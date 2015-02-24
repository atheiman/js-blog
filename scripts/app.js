function App(options) {
    // options object should contain the following properties:
    //
    // - productionHostname     string (no trailing slash, thanks tho)
    // - srcPath                string (gimme the trailing slash, please)
    // - categories             array of category objects:
    //     - name               capitalized string
    //     - posts              array of post objects (category, src, title, slug)

    var requiredProps = ['categories', 'posts'];
    for (prop in requiredProps) {
        if (!options.hasOwnProperty(requiredProps[prop]))
            debug('options missing required property ' + prop);
    };

    this.categories = options.categories;
    this.posts = options.posts;
    this.recentPostsDisplay = getProp(options, 'recentPostsDisplay', 3);
    this.srcPath = getProp(options, 'srcPath', "src/");
    this.productionHostname = getProp(options, 'productionHostname', '');

    this.getPostIndex = function (post) {

    };

    this.getPostFromTitle = function (titleStr) {
        var returnPost = {};
        this.posts.forEach(function (post) {
            if (post.title.toLowerCase() === titleStr.toLowerCase())
                returnPost = post;
        });
        if (Object.keys(returnPost).length === 0) {
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
        if (Object.keys(returnPost).length === 0) {
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
        post = app.getPostFromSlug(location.hash.slice(1));
        if (post === null) {    // slug is a category
            var post = app.getPostsOfCategory(location.hash.slice(1))[0];
            debug('retrieved most recent post of category ' + location.hash.slice(1));
        }
        var src = post.src;
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
                spinner.stop();
                highlightCode();
            }
        };
        xmlhttp.open("GET", app.srcPath + src + "?t=" + Math.random(), true);
        xmlhttp.send();
        var spinner = new Spinner(spinnerOpts).spin(contentDiv);
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
