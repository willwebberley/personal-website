---
year: 2021
month: 1
day: 3
title: "Scaling serverless apps: some lessons learned"
---

Building apps on serverless architecture has been a game-changer for me and for developers everywhere, enabling small dev teams to cheaply build and scale services from MVP through to enterprise deployment.

Taking advantage of serverless solutions - such as AWS' Lambda, Google's Cloud Functions, and Cloudflare's Workers - means less resource is spent on traditional dev-ops and deployment and, especially when combined with tools like [Serverless framework](https://www.serverless.com) and its rich [ecosystem of plugins](https://www.serverless.com/plugins), you can use the time instead to better develop your products. Let the provider worry about deploying your code, keeping your services highly available, and scaling them to meet the needs of huge audiences.

Serverless providers often [bill by](https://aws.amazon.com/lambda/pricing) number of "invocations" (the number of times your functions are executed) and total execution time. This means you're only paying for your services while they are actively being used, as opposed to the traditional server(-full?) model in which you have to pay to keep your services available 24/7. Given providers often have generous free tiers, you might not even start paying for anything until your service gets popular enough, which is always a nice problem to have.

However, before you get to that stage, it's worth also being aware of some of the pitfalls that come with adopting a serverless-only approach and knowing you may later need to prepare to migrate your service further down the line. Many of these are by design; to help keep things quick to deploy and run, but others are less obvious or predictable. I'll refer to AWS and Lambda (and Serverless framework) in this post, as it's what I'm most familiar with, but the concepts should mostly translate to other providers.

## It might not stay cheap
If deploying a web service to Lambda, it's likely you'll front it using [API Gateway](https://aws.amazon.com/api-gateway), and Serverless framework will set this all up for you at deploy-time. Whilst offering lots of nice features (authorizers, automatic TLS termination, integrations with [Certificate Manager](https://aws.amazon.com/certificate-manager), and more), API Gateway also comes with a nice free tier.

However, you will [start paying](https://aws.amazon.com/api-gateway/pricing) once your service gets popular enough. This means that on top of Lambda billing you for invocations and compute time, you're also getting hit by bandwidth and API call costs. If by good (or bad) marketing your service ends up suddenly getting a lot of visitors - perhaps whilst you're away for a week on holiday - AWS will happily and seamlessly scale to meet the demand, but you might get hit with a nasty bill on your return.

There are a number of posts online on this matter ([example here](https://einaregilsson.com/serverless-15-percent-slower-and-eight-times-more-expensive)), so it's worth doing some research beforehand.

## Performance
The link mentioned just above also makes note of the performance of Lambda functions. Whilst the technology makes development and delivery super easy, it comes with the downside of reduced performance.

To save costs Lambda keeps your function code out of memory. It will only provision compute power, locate and retrieve your code, and finally execute it when the function is actually invoked. This is known as a [cold start](https://www.serverless.com/blog/keep-your-lambdas-warm), and invocations that start cold will cause your requests to take longer. If the function is executed frequently, Lambda will keep it "warm" and you'll notice the requests are quicker.

Note that cold starts [may not be a problem for Cloudflare Workers](https://blog.cloudflare.com/eliminating-cold-starts-with-cloudflare-workers) and Serverless framework has [plugins to help mitigate them too](https://github.com/juanjoDiaz/serverless-plugin-warmup).

AWS Lambda also has other overheads which may mean you notice a performance reduction compared to when running your app in a container or on a VM.

## Limitations
Lambda imposes a number of limitations that you would not be subject to when deploying using a VM or containers. Many can be increased, but this would come with cost implications and require a chat with AWS support.

## Language runtimes
Historically, Lambda only offered a fixed set of language runtimes and versions - including some of the most popular, such as Python, Node, Ruby, and Go. You can now provide your own runtime (e.g. if you wanted to write a service in Rust), but this requires you to do [your own configuration](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-custom.html) first.

## Function file size
AWS has a default limit of 75GB for storing all of your Lambda functions, dependencies, and layers. This seems like quite a lot, but if you had multiple NodeJS Lambda applications, each with large `node_modules` directories for dependencies, and considering Serverless framework [versions each release](https://www.serverless.com/framework/docs/providers/aws/guide/functions#versioning-deployed-functions) by default, you might hit this limit sooner than you think and become unable to release any new code until you can find something to delete.

## Request and response data
When using a Lambda function as part of a web service, it will naturally be involved with handling request data and emitting response data. This is one that got me confused for a while in an API I was building: there is a 6MB limit to the size of the request and response.

Whilst this won't (and shouldn't) be an issue for most REST APIs, a client for a project I worked on needed a large volume of data returned by a single call for daily automated data exports, which one day just stopped working by itself. Cloudwatch logs didn't reveal any particular problems and API Gateway was only responding with non-descriptive errors. After some investigation it turned out that the response had trickled over the payload size limit. It's worth considering and remembering this if you ever get hit with a similar problem.

## Response structure
Remember that if your Lambda function does not return a correctly-formatted response, API Gateway will respond to the client with an error status code - even if the function executed successfully. Always return a response from your function since Cloudwatch won't give much away in this scenario either (the function may have still executed successfully), which is another pain to debug.

## Resource limits
When deploying an application using Serverless framework, a number of AWS resources are created on your behalf in a single "stack" using [CloudFormation](https://aws.amazon.com/cloudformation). On the surface, a single function could be associated with a large number of "resources" (e.g. the function itself, layers, IAM roles, Cloudwatch log groups, authorizers, API Gateway resources/methods, etc.).

CloudFormation limits stacks to 500 resources each, and if your application has more than a handful of functions (e.g. for handling different types of events) then you might very well this limit.

It can be mitigated by combining similar functions together (using arguments to define any differences), or by separating functions out to another Serverless application. Either way, you'd need to consider your strategy with this.

## Closing remarks
Despite some of these fallbacks, I can still very much recommend taking advantage of serverless architecture when creating your apps, and I will certainly continue to build on these platforms in many areas of my work.

The purpose of this post is just to raise awareness around some of the invonveniences I have faced during my time working with this technology, but I still love its power and flexibility.