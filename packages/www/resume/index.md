---
layout: default
title: Gregory J. Scott
_links:
  self:
    href: /resume/
  languages:
    href: /languages/
  db:
    href: /db/
  os:
    href: /os/
  tools:
    href: /tools/
  jobs:
    href: /jobs/
  schools:
    href: /schools/
---

<nav>
  <a href="{{ site.url }}">Home</a> /
  <a href="{{ site.url }}/resume">Resume</a>
</nav>

<section markdown="1">

{% include resume/contact.md %}

</section>

<section markdown="1">

{% include resume/skills.md %}

</section>

<section markdown="1">

## Experience

{% for item in page._embedded.jobs %}
   {% include resume/job.html job=item %}
{% endfor %}

</section>

<section markdown="1">

## Education

{% for item in page._embedded.schools %}
   {% include resume/school.html school=item %}
{% endfor %}

</section>
