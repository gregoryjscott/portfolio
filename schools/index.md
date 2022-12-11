---
layout: default
title: Schools
items:
  - title: University of Central Oklahoma
    desc: >-
      The University of Central Oklahoma (UCO) is a public university in Edmond,
      Oklahoma founded in 1890.
    role: Student
    begin_year: 1994
    end_year: 1998
    _links:
      languages:
        - href: /languages/fortran/
        - href: /languages/pascal/
        - href: /languages/c/
        - href: /languages/cpp/
        - href: /languages/vb/
      self:
        href: /schools/uco/
    _embedded:
      languages:
        - title: FORTRAN
          desc: null
          _links:
            schools:
              - href: /schools/uco/
            self:
              href: /languages/fortran/
        - title: Pascal
          desc: null
          _links:
            schools:
              - href: /schools/uco/
            self:
              href: /languages/pascal/
        - title: C
          desc: null
          _links:
            schools:
              - href: /schools/uco/
            self:
              href: /languages/c/
        - title: C++
          desc: null
          _links:
            schools:
              - href: /schools/uco/
            self:
              href: /languages/cpp/
        - title: Visual Basic
          desc: null
          _links:
            schools:
              - href: /schools/uco/
            self:
              href: /languages/vb/
---

{% assign ui_text = site.data.ui-text['ui_text'] %}

<div class="section spacer"></div>

<div class="section bread">
	<div class="content">
		<div class="h-subtitle">
			<p><a href="{{ site.url }}">{{ ui_text.home }}</a> / <a href="{{ page.url }}">{{ page.title }}</a></p>
		</div>
	</div>
</div>

<div class="section title">
	<div class="content">
		<h1>{{ page.title }}</h1>
    <p>
Schools attended.
    </p>
	</div>
</div>

<div class="section">
	<div class="content">
{% for item in page.items %}
  {% include schools/summary.html school=item %}
{% endfor %}
	</div>
</div>