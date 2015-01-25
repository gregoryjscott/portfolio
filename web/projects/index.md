---
layout: default
title: Projects
---

<section markdown="1">
These are most of my current and past projects. Projects can also be explored by skill such as [language](/languages), [operating system](/os), or [database](/db).
</section>

<section>
{% for item in page.items %}
  <h1>{{ item.title }}</h1>

  <p><em>{{ item.subtitle }}</em></p>

  {% include links-ul.html data=item %}
{% endfor %}
</section>

<hr>

<section markdown="1">
{% include get-started.md %}
</section>
