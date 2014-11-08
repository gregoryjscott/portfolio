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

Alternatively, you can explore by skill such as [language](/languages) using the links underneath each project.
</section>

<section>
{% assign list = page.projects | sort: 'begin_year' | sort: 'end_year', 'last' %}
{% for project in list reversed %}
  <h1><a href="{{ project.url }}">{{ project.title }}</a></h1>

  {% if project.todo %} *NEEDS WORK* {% endif %}

  <p>
  <em>
    {{ project.role }},
    {{ project.begin_year }}
      {% unless project.begin_year == project.end_year %} -
        {% if project.end_year %}
          {{ project.end_year }}
        {% else %}
          present
        {% endif %}
      {% endunless %}
  </em>
  </p>

  <p>{{ project.desc }}</p>

  {% include links.md resource=project %}
{% endfor %}
</section>
