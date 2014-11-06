---
layout: default
key: tools
title: Tools
---

<header>
  <nav>
    <a href="/">gregoryjscott</a> / {{ page.key }}
  </nav>

  <h1>{{ page.title }}</h1>
</header>

<section markdown="1">
I prefer the open source variety.
</section>

<section>
{% assign list = page.tools | sort: 'projects_count' %}
{% for tool in list reversed %}
  <h1><a href="{{ tool.url }}">{{ tool.title }}</a></h1>

  <p>{{ tool.desc }}</p>

  {% include links.md resource=tool %}
{% endfor %}
</section>
