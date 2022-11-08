{% assign content = site.data.content['about'] %}

<!-- About -->
<div class="section about">
	<div class="content">
		{{ if content.title != '' }}
		<div class="title">
			<div class="title_inner">{{ content.title }}</div>
		</div>
		{{ endif }}

		<div class="desc" markdown="1">
			<p><h1>Hi, I'm Greg.</h1></p>
			<p>
			My [projects](/projects) have used an impressive spectrum of [languages](/languages), [tools](/tools), and [databases](/db). Feel free to browse my [resume](/resume).
			</p>
			<p>
			I'm currently searching for my next challenge. Please don't hesitate to <a href="mailto:me@gregoryjscott.com">contact me</a> if I might be of service to you.
			</p>
		</div>
		<div class="clear"></div>
	</div>
</div>