---
layout: default
title: Jobs
_links:
  self:
    href: /jobs/
  index:
    - href: /jobs/boeing/
    - href: /jobs/fe/
    - href: /jobs/freelance/
    - href: /jobs/mas/
    - href: /jobs/rdi/
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
Jobs.
    </p>
	</div>
</div>

<div class="section">
	<div class="content">
{% for item in page.items %}
  {% include jobs/summary.html job=item %}
{% endfor %}
	</div>
</div>
