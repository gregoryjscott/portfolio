---
layout: default
title: Databases
desc: List of databases.
_links:
  self:
    href: /db/
  index:
    - href: /db/access/
    - href: /db/bigquery/
    - href: /db/btrieve/
    - href: /db/oracle/
    - href: /db/pervasive/
    - href: /db/postgres/
    - href: /db/sql-server/
    - href: /db/sqlite/
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
{% include db/summary.html db=item %}
{% endfor %}
