---
layout: default
title: Languages
_links:
  self:
    href: /languages/
  index:
    - href: /languages/ada/
    - href: /languages/c/
    - href: /languages/cpp/
    - href: /languages/cs/
    - href: /languages/css/
    - href: /languages/delphi/
    - href: /languages/fortran/
    - href: /languages/html/
    - href: /languages/java/
    - href: /languages/js/
    - href: /languages/pascal/
    - href: /languages/php/
    - href: /languages/plsql/
    - href: /languages/py/
    - href: /languages/rb/
    - href: /languages/sql/
    - href: /languages/ts/
    - href: /languages/tsql/
    - href: /languages/vb/
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
My projects use these programming languages.
    </p>
	</div>
</div>

<div class="section">
	<div class="content">
{% for item in page.items %}
  {% include languages/summary.html language=item %}
{% endfor %}
	</div>
</div>
