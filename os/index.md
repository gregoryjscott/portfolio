---
layout: default
key: os
title: Operating Systems
---

<header>
  <nav>
    <a href="/">gregoryjscott</a> / {{ page.key }}
  </nav>

  <h1>{{ page.title }}</h1>
</header>

<section markdown="1">
Linux is already the future.
</section>

<section>
{% assign list = page.os | sort: 'projects_count' %}
{% for os in list reversed %}
  <h1><a href="{{ os.url }}">{{ os.title }}</a></h1>

  {% if os.todo %} *NEEDS WORK* {% endif %}

  <p>{{ os.desc }}</p>

  {% include links.md resource=os %}
{% endfor %}
</section>
