---
layout: default
title: Operating Systems
desc: List of operating systems.
_links:
  self:
    href: /os/
  index:
    - href: /os/aix/
    - href: /os/android/
    - href: /os/ios/
    - href: /os/linux/
    - href: /os/ms-dos/
    - href: /os/netware/
    - href: /os/osx/
    - href: /os/solaris/
    - href: /os/windows/
---

<section>
  <a href="{{ site.url }}">Home</a> / <a href="{{ page.url }}">{{ page.title }}</a>
</section>

<section>
  <p><h1>{{ page.title }}</h1></p>
  <p><em>{{ page.subtitle }}</em></p>
  {% if page.desc %}
    <p>{{ page.desc }}</p>
  {% endif %}
</section>

{% for item in page._embedded.index %}
{% include os/summary.html os=item %}
{% endfor %}
