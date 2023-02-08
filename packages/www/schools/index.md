---
layout: default
title: Schools
desc: List of schools.
_links:
  self:
    href: /schools/
  index:
    - href: /schools/uco/
---

<section>
  <a href="{{ site.url }}">Home</a> / <a href="{{ page.url }}">{{ page.title }}</a>
</section>

<section>
  <p><h1>{{ page.title }}</h1></p>
  <p><em>{{ page.subtitle }}</em></p>
  {% if page.desc %}
    <p>{{ page.desc }}</p>
  {% endif %}
</section>

{% for item in page._embedded.index %}
{% include schools/summary.html school=item %}
{% endfor %}
