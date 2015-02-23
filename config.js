var app = new App({
    'productionHostname': 'github.io',
    'srcPath': 'src/',
    'categories': [
        {
            'name': 'Django',
            'posts': [
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
                }
            ]
        },
        {
            'name': 'JavaScript',
            'posts': [
                {
                    category: "Uncategorized",
                    src: "uncategorized/js-ternary.md",
                    title: "JavaScript Ternary Operator",
                    slug: "js-ternary-operator"
                }
            ]
        }
    ]
});
