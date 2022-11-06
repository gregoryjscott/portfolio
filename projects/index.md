---
layout: default
title: Projects
---

{% assign ui_text = site.data.ui-text['ui_text'] %}

<!-- Spacer -->
<div class="section spacer"></div>

<!-- Title -->
<div class="section title">
	<div class="content">
		<div class="h-subtitle typed-bread-template">
			<p><a href="{{ site.url }}">{{ ui_text.home }}</a> / <a href="{{ page.url }}">{{ page.title }}</a></p>
		</div>
		<span class="typed-bread"></span>
	</div>
</div>

<div class="section"><div class="content">
<section markdown="1">
Projects can also be explored by skill such as [language](/languages) or [database](/db).
</section>
</div></div>

<section>
{% for item in page.items %}
<div class="section"><div class="content">
  <h1><a href="{{ item.url }}">{{ item.title }}</a></h1>

  <p><em>{{ item.subtitle }}</em></p>

  {% if item.desc %}
  <p>{{ item.desc }}</p>
  {% endif %}

  {% include links-ul.html data=item %}
</div></div>
{% endfor %}
</section>
