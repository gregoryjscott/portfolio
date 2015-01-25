---
layout: default
title: Databases
---

<header>
  <nav>
    <a href="/">gregoryjscott</a> / db
  </nav>

  <h1>{{ page.title }}</h1>
</header>

<section markdown="1">
My projects use these databases.
</section>

<section>
{% for item in page.items %}
  <h1><a href="{{ item.url }}">{{ item.title }}</a></h1>

  <p>{{ item.desc }}</p>

  {% include links-ul.html data=item %}
{% endfor %}
</section>

<hr>

# Find out more about me.

<a class="button" href="/work/">Check out my work</a>
<a class="button" href="/skills/">Explore my skills</a>
<a class="button recommend" href="/services/">Learn what I can do for you</a>
