---
layout: default
title: Projects
---

<header>
  <nav>
    <a href="/">gregoryjscott</a> / projects
  </nav>

  <h1>{{ page.title }}</h1>
</header>

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

# Find out more about me.

<a class="button" href="/work/">Check out my work</a>
<a class="button" href="/skills/">Explore my skills</a>
<a class="button recommend" href="/services/">Learn what I can do for you</a>
