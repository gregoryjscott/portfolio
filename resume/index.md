---
title: Resume
layout: default
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

<div class="section"><div class="content">
<h1>Gregory J. Scott</h1>
<section markdown="1">
* web: [http://gregoryjscott.com][g]
* email: [me@gregoryjscott.com][email]
* github: [https://github.com/gregoryjscott][github]
* twitter: [https://twitter.com/gregoryjscott][twitter]
</section>
</div></div>

<div class="section"><div class="content">
<section markdown="1">
{% include resume/skills.md %}
</section>
</div></div>

<div class="section"><div class="content">
<section markdown="1">
{% include resume/experience.md %}
</section>
</div></div>

<div class="section"><div class="content">
<section markdown="1">
{% include resume/education.md %}
</section>
</div></div>

[g]: http://gregoryjscott.com
[email]: mailto:me@gregoryjscott.com
[twitter]: https://twitter.com/gregoryjscott
[github]: https://github.com/gregoryjscott
