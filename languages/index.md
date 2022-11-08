---
layout: default
title: Languages
---

{% assign ui_text = site.data.ui-text['ui_text'] %}

<div class="section spacer"></div>

<div class="section bread">
	<div class="content">
		<div class="h-subtitle typed-bread-template">
			<p><a href="{{ site.url }}">{{ ui_text.home }}</a> / <a href="{{ page.url }}">{{ page.title }}</a></p>
		</div>
		<span class="typed-bread"></span>
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
