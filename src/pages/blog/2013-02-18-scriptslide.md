---
year: 2013
month: 2
day: 18
title: ScriptSlide
layout: post
---

<p>
I've taken to writing most of my recent presentations in plain HTML (rather than using third-party software or services). I used
JavaScript to handle the appearance and ordering of slides. An example (to show what I mean) is 
<a href="http://www.willwebberley.net/downloads/scriptslide" target="_blank">here</a>.
</p>
<p>I bundled the JS into a single script, <span class="code">js/scriptslide.js</span>, which can be configured
using the <span class="code">js/config.js</span> script. </p>
<p>There is a <a href="https://github.com/flyingSparx/ScriptSlide" target="_blank">Github repo</a> for the code, along with example usage and instructions.</p>
<p>
Most configuration can be done by using the <span class="code">js/config.js</span> script, which supports many features including:</p>
<ul>
	<li>Set the slide transition type (appear, fade, slide)</li>
	<li>Set the logos, page title, etc.</li>
	<li>Configure the colour scheme</li>
</ul>
<p>
Then simply create an HTML document, set some other styles (there is a template in <span class="code">css/styles.css</span>), and 
put each slide inside <span class="code">&lt;section&gt;...&lt;/section&gt;</span> tags. The slide menu is then generated autmatically
when the page is loaded.
</p>
