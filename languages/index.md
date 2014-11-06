---
layout: default
title: Languages
---

<header>
  <nav>
    <a href="/">gregoryjscott</a> / {{ page.key }}
  </nav>

  <h1>{{ page.title }}</h1>
</header>

<section markdown="1">
I like to learn new languages!
</section>

<section>
{% assign list = page.languages | sort: 'projects_count' %}
{% for language in list reversed %}
  <h1><a href="{{ language.url }}">{{ language.title }}</a></h1>

  {% if language.todo %} *NEEDS WORK* {% endif %}

  <p>{{ language.desc }}</p>

  {% include links.md resource=language %}
{% endfor %}
</section>
