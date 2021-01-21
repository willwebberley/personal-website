---
title: "Hue: Security Lights"
description: "Working with the Philips Hue bridge"
---

A [previous note about Philips Hue bulbs](/notes/2017/06/26/cenode-iot) got me thinking that the API exposed by the bridge might be used to warn if the house lights are left on too late at night, or even if they get turned on at unexpected times - potentially for security.

I put together a simple program that periodically checks the status of known Hue bulbs late at night. If any bulbs are discovered to be powered on during such times then an email notification is sent. It runs as a `systemd` service on a Raspberry Pi.

<img class="small-image" src="/media/blog/security-lights.png">

Currently the project is quite basic, but it could be further extended - perhaps to implement ignore lists or to automatically turn off specific sets of bulbs if they are found to be powered on.

For those interested, the project source and setup info is [available on GitHub](https://github.com/willwebberley/lights-checker).
