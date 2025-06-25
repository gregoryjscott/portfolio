---
layout: default
title: Schools
desc: List of schools.
_links:
  self:
    href: /schools/
  schools:
    - href: /schools/uco/
---

<nav>
  <a href="{{ site.url }}">Home</a> /
  <a href="{{ page.url }}">{{ page.title }}</a>
</nav>

{% include basic-info.html %}

{% for item in page._embedded.schools %}
  {% include summary.html resource=item heading_level=2 %}
{% endfor %}
