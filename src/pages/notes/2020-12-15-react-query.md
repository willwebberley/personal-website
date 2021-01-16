---
year: 2020
month: 12
day: 15
title: "React Query"
---

If you write React web apps that interface with a backend web API then definitely consider trying [React Query](https://react-query.tanstack.com).

The library makes use of modern React patterns, such as hooks, to keep code concise and readable. It probably means you can keep API calls directly inside your normal component code rather than setting-up your own client-side API interface modules.

React Query will also cache resolved data through unique "query keys", so you can keep transitions in UIs fast with cached data without needing to rely on redux.

You'll still need to write the actual requests yourself (e.g. using [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) or [axios](https://github.com/axios/axios)) but using this certainly takes away a lot of the pain in building smooth asynchronous web apps.

To try it out install it with your usual Node package manager and begin with the [quick start guide](https://react-query.tanstack.com/quick-start). 