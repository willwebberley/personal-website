---
year: 2013
month: 5
day: 26
title: Gower Tides Open-Sourced
layout: post
---

<p>This is just a quick post to mention that I have made the source for the <a href="https://play.google.com/store/apps/details?id=net.willwebberley.gowertides" target="_blank">Gower Tides</a> app on Google Play public.</p>
<p>The source repository is available on <a href="https://github.com/flyingsparx/GowerTides" target="_blank">GitHub</a>. From the repository I have excluded:
<ul>
    <li><strong>Images & icons</strong> - It is not my place to distribute graphics not owned or created by me. Authors are credited in the repo's README and in the application.</li>
    <li><strong>External libraries</strong> - The app requires a graphing package and a class to help with handling locally-packaged SQLite databases. Links to both are also included in the repo's README.</li>
    <li><strong>Tidal data</strong> - The tidal data displayed in the app has also been excluded. However, the format for the data stored by the app should be relatively obvious from its access in the <a href="https://github.com/flyingsparx/GowerTides/blob/master/src/net/willwebberley/gowertides/utils/DayDatabase.java" target="_blank">source</a>.</li>
</ul></p>
