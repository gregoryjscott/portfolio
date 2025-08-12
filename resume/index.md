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
  devices:
    href: /devices/
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

Software architect with 25+ years of experience designing and building robust systems for mission-critical environments, from B-1 Bomber avionics to scalable cloud platforms on AWS. Now developing the next generation of educational technology, leveraging AI to create personalized learning experiences delivered as universal apps.

- Web: [https://gregoryjscott.com](https://gregoryjscott.com)
- Email: [me@gregoryjscott.com](mailto:me@gregoryjscott.com)
- GitHub: [https://github.com/gregoryjscott](https://github.com/gregoryjscott)
- Twitter: [https://x.com/gregoryjscott](https://x.com/gregoryjscott)

<h2>Highlights</h2>

{% for highlight in page._embedded.projects %}
  {% include resume/project.html resource=highlight %}
{% endfor %}

<h2 class="break">Skills</h2>

{% for resource in site.data.resources %}
  {% include resume/skill.html site_resource=resource embedded=page._embedded %}
{% endfor %}

<h2 class="break">Experience</h2>

{% for item in page._embedded.jobs %}
   {% include resume/job.html job=item %}
{% endfor %}

<h2 class="break">Education</h2>

{% for item in page._embedded.schools %}
   {% include resume/school.html school=item %}
{% endfor %}

</div>