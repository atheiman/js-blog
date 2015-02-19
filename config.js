var app = new App({
    'productionHostname': 'github.io',
    'srcPath': 'src/',
    'categories': [
        "Django",
        "Uncategorized"
    ],
    'posts': [
        {
            category: "Django",
            src: "django/django-basics.html",
            title: "Django Basics",
            slug: "django-basics"
        },
        {
            category: "Django",
            src: "django/django-orm.html",
            title: "Django ORM",
            slug: "django-orm"
        },
        {
            category: "Uncategorized",
            src: "uncategorized/js-ternary.html",
            title: "JavaScript Ternary Operator",
            slug: "js-ternary-operator"
        }
    ]
});
