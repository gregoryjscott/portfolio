## Highlights

{% for highlight in page._embedded.projects %}
  {% include resume/project.html resource=highlight %}
{% endfor %}
