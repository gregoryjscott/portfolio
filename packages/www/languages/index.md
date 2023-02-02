---
layout: default
title: Languages
---

<section markdown="1">
My projects use these programming languages.
</section>

<section>
{% for item in page.items %}
  {% if item.desc %}
  <h1><a href="{{ item.url }}">{{ item.title }}</a></h1>

  <p>{{ item.desc }}</p>

  {% include links-ul.html data=item %}
  {% endif %}
{% endfor %}
</section>

<section markdown="1">
{% include get-started.md %}
</section>

<script>
  element = document.getElementById("language-menu");
  element.className += " active";
</script>
