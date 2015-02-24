var app = new App({
    'productionHostname': 'atheiman.github.io',
    'srcPath': 'src/',
    'recentPostsDisplay': 2,    // set to 0 to hide
    'categories': [
        'Django',
        'JavaScript'
    ],
    'posts': [    // posts at the top of the list should be the most recent
        {
            category: "Django",
            src: "django/django-basics.md",
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
            src: "uncategorized/js-ternary.md",
            title: "JavaScript Ternary Operator",
            slug: "js-ternary-operator"
        }
    ]
});
