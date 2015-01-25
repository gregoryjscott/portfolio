---
layout: default
title: Operating Systems
---

<section markdown="1">
My projects run on these operating systems.
</section>

<section>
{% for item in page.items %}
 <h1><a href="{{ item.url }}">{{ item.title }}</a></h1>

 <p>{{ item.desc }}</p>

  {% include links-ul.html data=item %}
{% endfor %}
</section>

<hr>

<section markdown="1">
{% include get-started.md %}
</section>
