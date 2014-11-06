{% if include.links %}
  <li>
    {{ include.label }}{% if include.show_count %} ({{ include.links.size }}){% endif %}:
    {% for link in include.links %}
      <a href="{{ link.url }}">{{ link.title }}</a>{% unless forloop.last %},{% endunless %}
    {% endfor %}
  </li>
{% endif %}
