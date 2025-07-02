---
layout: default
title: Gregory J. Scott
_links:
  self:
    href: /resume/
  projects:
    - href: /projects/nuggets/
    - href: /projects/epicloud/
    - href: /projects/qb/
    - href: /projects/sif-agent/
    - href: /projects/mission-data-loader/
  languages:
    href: /languages/
  db:
    href: /db/
  tools:
    href: /tools/
  os:
    href: /os/
  jobs:
    href: /jobs/
  schools:
    href: /schools/
---

<div class="resume" markdown="1">

<nav>
  <a href="{{ site.url }}">Home</a> / Resume
</nav>

# Gregory J. Scott

Versatile full-stack programmer with 25+ years of experience, specializing in custom app development using React Native, AI, state machines, and AWS.

Online:
- Web: [https://gregoryjscott.com](https://gregoryjscott.com)
- Email: [me@gregoryjscott.com](mailto:me@gregoryjscott.com)
- GitHub: [https://github.com/gregoryjscott](https://github.com/gregoryjscott)
- Twitter: [https://x.com/gregoryjscott](https://x.com/gregoryjscott)

## Highlights

{% for highlight in page._embedded.projects %}
  {% include resume/project.html resource=highlight %}
{% endfor %}

## Skills

{% for resource in site.data.resources %}
  {% include resume/skill.html site_resource=resource embedded=page._embedded %}
{% endfor %}

## Experience

{% for item in page._embedded.jobs %}
   {% include resume/job.html job=item %}
{% endfor %}

## Education

{% for item in page._embedded.schools %}
   {% include resume/school.html school=item %}
{% endfor %}

</div>