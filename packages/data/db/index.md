---
layout: default
title: Databases
_links:
  self:
    href: /db/
  index:
    - href: /db/access/
    - href: /db/bigquery/
    - href: /db/btrieve/
    - href: /db/oracle/
    - href: /db/pervasive/
    - href: /db/postgres/
    - href: /db/sql-server/
    - href: /db/sqlite/
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
My projects use these databases.
    </p>
	</div>
</div>

<div class="section">
	<div class="content">
{% for item in page.items %}
  {% include db/summary.html db=item %}
{% endfor %}
	</div>
</div>
