---
layout: default
title: Home
_links:
  index:
    - href: /db/
    - href: /jobs/
    - href: /languages/
    - href: /os/
    - href: /projects/
    - href: /schools/
    - href: /tools/
  self:
    href: /
---

<section markdown="1">

Hello,

Check out my [resume](/resume/)!

I've programmed <span id="typed"></span>
<span id="typed-strings">
  <span>[servers](/devices/server)</span>,
  <span>[clouds](/devices/cloud)</span>,
  <span>[PCs](/devices/pc)</span>,
  <span>[Macs](/devices/mac)</span>,
  <span>[iPhones](/devices/iphone)</span>,
  <span>[Androids](/devices/android)</span>,
  <span>[iPads](/devices/ipad</span>,
  <span>[Chromebooks](/devices/chromebook)</span>,
  <span>[TVs](/devices/tv)</span>,
  <span>[hand-held range finders](/devices/range-finder)</span>,
  <span>[GPS devices](/devices/gps)</span>,
  <span>[lasers mounted to planes](/devices/laser)</span>,
  <span>[calculators](/devices/calculator)</span>, and
  <span>[B-1 Bombers](/devices/b-1)</span>.
</span>

[Reach out](mailto:me@gregoryjscott.com) if you'd like to work together.

Thanks for visiting.

Greg

</section>

<script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"></script>
<script>
  const addPeriod = (s) => {
    if (s[s.length - 1] === '.') return s;
    return s + '.';
  };
  document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed('#typed', {
      stringsElement: '#typed-strings',
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 2000,
      contentType: 'html',
      loop: true,
      onBegin: (self) => {
        self.strings = self.strings.map(addPeriod);
      },
    });
  });
</script>

