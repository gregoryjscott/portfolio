---
layout: default
title: Databases
desc: List of databases.
_links:
  self:
    href: /db/
  db:
    - href: /db/access/
    - href: /db/bigquery/
    - href: /db/btrieve/
    - href: /db/oracle/
    - href: /db/pervasive/
    - href: /db/postgres/
    - href: /db/sql-server/
    - href: /db/sqlite/
---

<nav>
  <a href="{{ site.url }}">Home</a> /
  <a href="{{ page.url }}">{{ page.title }}</a>
</nav>

{% include basic-info.html %}

{% for item in page._embedded.db %}
{% include db/summary.html db=item heading_level=2 %}
{% endfor %}
