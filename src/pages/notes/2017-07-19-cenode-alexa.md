---
title: "Alexa, ask Sherlock..."
layout: post
---

I have recently [posted about CENode](/2017/06/22/cenode/) and how it might be [used in IoT systems](/2017/06/26/cenode-iot/).

Since CENode is partially designed to communicate directly with humans (particularly those out and about or "in the field") it makes sense for inputs and queries to be provided via voice in addition to or instead of a text interface. Whilst this has been explored in the browser (including in the [previous Philips Hue control demo](/2017/06/26/cenode-iot/)), it made sense to also try to leverage the Alexa voice service to interact with a CENode instance.

The [Alexa Voice Service](https://developer.amazon.com/alexa-voice-service) and [Alexa Skills Kit](https://developer.amazon.com/alexa-skills-kit) are great to work with, and it was relatively straight forward to create a skill to communicate with CENode's [RESTful API](https://github.com/willwebberley/CENode/wiki/CEServer-Usage).

The short video below demonstrates this through using an Amazon Echo to interact with a standard, non-modified CENode instance running on [CENode Explorer](http://explorer.cenode.io) that is partly pre-loaded with the "space" scenario used in our main [CENode demo](http://cenode.io/demo/index.html). The rest of the post discusses the implementation and challenges.

<iframe src="https://player.vimeo.com/video/226199106" width="640" height="480" style="margin:20px auto;display:block; max-width: 100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Typical Alexa skills are split into ["intents"](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-interaction-model-reference), which describe the individual ways people might interact with the service. For example, the questions "what is the weather like today?" and "is it going to rain today?" may be two intents of a single weather skill.

The skill logic is handled by [AWS Lambda](https://aws.amazon.com/lambda), which is used to associate each intent with an action. When someone gives a voice command, the Alexa Voice Service (AVS) determines which intent is being called for which service, and then passes the control over to the appropriate segment in the Lambda function. The function returns a response to the AVS, which is read back out to the user.

The strength of Alexa's ability to recognise speech is largely dependent on the information given to build each intent. For example, the intent "what is the weather like in {cityName}?", where `cityName` is a variable with several different possibilities generated during the build, will accurately recognise speech initiating this intent because the sentence structure is so well defined. A single intent may have several ways of calling it - "what's the weather like in...", "tell me what
the weather is in...", "what's the weather forecast for...", etc. - which can be bundled into the model to further improve the accuracy even in noisy environments or when spoken by people with strong accents.

Since CENode is designed to work with an entire input string, however, the voice-to-text accuracy is much lower, and thus determining the intent and its arguments is harder. Since we need CENode to handle the entire input, our demo only has a single intent with two methods of invocation (slots): 

- `ask Sherlock {sentence}`
- `tell Sherlock {sentence}`

Since 'Sherlock' is also provided as the invocation word for the service, both slots implicitly indicate both the service and the single intent to work with. I used 'Sherlock' as the name for the skill as it's a name we've used before for CENode-related apps and it is an easy word for Alexa to understand!

`sentence` is the complete body to be processed by CENode - e.g. "Jupiter is a planet" or "what is Jupiter?" - giving a typical full Echo invocation: "Alexa, tell Sherlock Jupiter is a planet". The `Alexa` segment tells the Echo to begin listening, the `tell Sherlock` component determines the skill and intent to use, and the remainder of the sentence is the body provided to CENode.

Since we only have a single intent, using either 'ask' or 'tell' in the invocation is irrelevant since it is CENode that will try and work out what is meant from the sentence body - whether a question or an input of information. The two slots are only used for the benefit of the human user and so invocations such as "tell Sherlock what is Jupiter?" still work. 

At this stage, the AWS Lambda function handling the intent makes a standard HTTP POST request to a CENode instance, and the response is directly passed back to the Alexa service for reading-out to the user. As such, CENode itself provides all of the error-handling and misunderstood inputs, making the Alexa service itself combined with the Lambda function, in this scenario, very 'thin'.

<img src="/media/blog/cenode-alexa.png" style="width:100%;max-width:620px;max-height:none;height:auto;">

The skill has not yet been published to the Alexa skills store for general use, but the code for this project, including the Alexa Skills Kit configuration and the AWS Lambda code (written using their Node environment) is [available on GitHub](https://github.com/willwebberley/cenode-alexa).
