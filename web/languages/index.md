---
layout: default
title: Languages
---

<section markdown="1">
My projects use these programming languages.
</section>

<section>
{% for item in page.items %}
  <h1><a href="{{ item.url }}">{{ item.title }}</a></h1>

  {% include links-ul.html data=item %}
{% endfor %}
</section>

<hr>

<section markdown="1">
{% include get-started.md %}
</section>
