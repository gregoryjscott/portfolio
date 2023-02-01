---
layout: default
title: Tools
_links:
  self:
    href: /tools/
  index:
    - href: /tools/classroom/
    - href: /tools/ddb/
    - href: /tools/docker/
    - href: /tools/drive/
    - href: /tools/ec2/
    - href: /tools/ecr/
    - href: /tools/ecs/
    - href: /tools/fargate/
    - href: /tools/firebase/
    - href: /tools/iam/
    - href: /tools/lerna/
    - href: /tools/node/
    - href: /tools/puppeteer/
    - href: /tools/s3/
    - href: /tools/sqs/
    - href: /tools/tracker/
    - href: /tools/vpc/
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
My projects use these tools.
    </p>
	</div>
</div>

<div class="section">
	<div class="content">
{% for item in page.items %}
  {% include tools/summary.html tool=item %}
{% endfor %}
	</div>
</div>
