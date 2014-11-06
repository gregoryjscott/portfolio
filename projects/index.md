---
layout: default
key: projects
title: Projects
---

<header>
  <nav>
    <a href="/">gregoryjscott</a> / {{ page.key }}
  </nav>

  <h1>{{ page.title }}</h1>
</header>

<section markdown="1">
My projects with most recent projects listed at the top. Select any project for more details.

Alternatively, you can explore by skills such as [languages](/languages) and [tools](/tools) using the links underneath each project.
</section>

<section>
{% assign list = page.projects | sort: 'end_year', 'last' | sort: 'begin_year' %}
{% for project in list reversed %}
  <h1><a href="{{ project.url }}">{{ project.title }}</a></h1>

  {% if project.todo %} *NEEDS WORK* {% endif %}

  <p>
  <em>
    {{ project.role }}, {{ project.begin_year }} -
      {% if project.end_year %}
        {{ project.end_year }}
      {% else %}
        present
      {% endif %}
  </em>
  </p>

  <p>{{ project.desc }}</p>

  {% include links.md resource=project %}
{% endfor %}
</section>
