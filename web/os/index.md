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

  {% if item.desc %}
  <p>{{ item.desc }}</p>
  {% endif %}

  {% include links-ul.html data=item %}
{% endfor %}
</section>

<hr>

<section markdown="1">
{% include get-started.md %}
</section>

<script>
element = document.getElementById("os-menu");
element.className += " active";
</script>
