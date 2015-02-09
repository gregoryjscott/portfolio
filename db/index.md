---
layout: default
title: Databases
---

<section markdown="1">
My projects use these databases.
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
element = document.getElementById("db-menu");
element.className += " active";
</script>
