---
layout: default
title: Operating Systems
desc: List of operating systems.
_links:
  self:
    href: /os/
  os:
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

<nav>
  <a href="{{ site.url }}">Home</a> /
  <a href="{{ page.url }}">{{ page.title }}</a>
</nav>

{% include basic-info.html %}

{% for item in page._embedded.os %}
  {% include summary.html resource=item heading_level=2 %}
{% endfor %}
