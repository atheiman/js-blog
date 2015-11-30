var app = new App({
    'productionHostname': 'atheiman.github.io',
    'srcPath': 'src/',
    'recentPostsDisplay': 3,    // set to 0 to hide
    'categories': [
        'Django',
        'JavaScript'
    ],
    'posts': [    // posts at the top of the list should be the most recent
        {
            category: "Django",
            src: "django/django-basics.html",
            title: "Django Basics",
            slug: "django-basics"
        },
        {
            category: "Django",
            src: "django/django-orm.md",
            title: "Django ORM",
            slug: "django-orm"
        },
        {
            category: "JavaScript",
            src: "javascript/js-ternary.md",
            title: "JavaScript Ternary Operator",
            slug: "js-ternary-operator"
        }
    ]
});
