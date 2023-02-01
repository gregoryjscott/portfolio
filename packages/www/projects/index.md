---
layout: default
title: Projects
---

<section markdown="1">
Projects can also be explored by skill such as [language](/languages) or [database](/db).
</section>

<section>
{% for item in page.items %}
  <h1><a href="{{ item.url }}">{{ item.title }}</a></h1>

  <p><em>{{ item.subtitle }}</em></p>

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
element = document.getElementById("project-menu");
element.className += " active";
</script>
