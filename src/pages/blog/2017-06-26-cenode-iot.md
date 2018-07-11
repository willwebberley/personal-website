---
title: CENode in IoT
layout: post
---

In my [previous post](/2017/06/22/cenode/) I discussed CENode and briefly mentioned its potential for use in interacting with the Internet of Things. I thought I'd add a practical example of how it might be used for this and for 'tasking' other systems.

I have a few [Philips Hue](http://www2.meethue.com/en-US) bulbs at home, and the Hue Bridge that enables interaction with the bulbs exposes a nice RESTful API. My aim was to get CENode to use this API to control my lights.

A working example of the concepts in this post is available [on GitHub](https://github.com/willwebberley/CENode-IoT) (as a small webapp) and here's a short demo video (which includes a speech-recognition component):

<iframe src="https://player.vimeo.com/video/223169323" width="640" height="480" style="margin:20px auto;display:block; max-width: 100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

The first step was to [generate a username for the Bridge](https://developers.meethue.com/documentation/configuration-api#71_create_user), which CENode can use to authenticate requests through the API.

I use [CE cards](https://pdfs.semanticscholar.org/d5d5/65fcadcb35579b5ee25cdaa713afa14f7835.pdf) to supply instructions to a CENode agent, since this is the generally recognised method for interaction between CE-capable devices. When instantiating a node, any number of CE 'models' may be passed in order to form a base knowledge set to work from. Here is such a model for giving CENode a view of the Hue 'world':

```
const lightModel = [
  'conceptualise a ~ hue bridge ~ h that has the value V as ~ address ~ and has the value W as ~ token ~',
  'conceptualise a ~ hue bulb ~ h that has the value C as ~ code ~ and has the value V as ~ strength ~',
  'conceptualise an ~ iot card ~ I that is a card and ~ targets ~ the hue bulb D and has the value P as ~ power ~ and has the value B as ~ brightness ~ and has the value S as ~ saturation ~ and has the value H as ~ hue ~ and has the value C as ~ colour ~',
  'there is a hue bridge named bridge1 that has \'192.168.1.2\' as address and has \'abc123\' as token',
];
```

The model tells the node about Hue Bridges, bulbs, and a new type of card called an `iot card`, which supports properties for controlling bulbs. Finally, we instantiate a single bridge with an appropriate IP address and the username/token generated earlier.

Next the CENode instance needs to be created and its agent prepared:

```
const node = new CENode(CEModels.core, lightModel);
const hueBridge = node.concepts.hue_bridge.instances[0];
updateBulbs();
node.attachAgent();
node.agent.setName('House');
```

The `updateBulbs()` function ([see it here](https://github.com/willwebberley/CENode-IoT/blob/master/app.js)) makes a request to the Bridge to download data about known Hue bulbs, which are added to the node's knowledge base. For example;

```
there is a hue bulb named 'Lounge' that has '7' as code
```

The `code` property is the unique identifier the bridge uses to determine the bulb on the network.

Finally, all that was needed was to include a handler function for `iot card`s and to add this to the CENode agent:

```
node.agent.cardHandler.handlers['iot card'] = (card) => {
  if (card.targets){
    const data = {};
    if (card.power) data.on = card.power === 'on';
    if (card.brightness) data.bri = parseInt(card.brightness)
    if (card.saturation) data.sat = parseInt(card.saturation)
    if (card.hue) data.hue = parseInt(card.hue)
    request('PUT', hueBridge, '/lights/' + card.targets.code + '/state', data);
  }
};
```

The function makes an appropriate request to the Hue Bridge based on the properties of the `iot card`. Now, we can submit sentences like this in order to interact with the system (e.g. to turn the 'Lounge' bulb on):

```
there is an iot card named card1 that is to the agent House and has 'instruction' as content and targets the hue bulb 'Lounge' and has 'on' as power
```

And that's it, really. This post contains only the more interesting components of the experiment, but hopefully provides an indication of how the library may be used for simple inter-device communication. The [full demo](https://github.com/willwebberley/CENode-IoT/blob/master/app.js) includes extra code to handle the UI for a webapp and extra utility functions.
