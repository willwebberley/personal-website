---
year: 2020
month: 11
day: 20
title: "JS Tidbit: Nullish Coalescing"
---

This short post introduces a useful JavaScript operator to help make your one-liners even more concise.

[The specification](https://tc39.es/ecma262/#prod-CoalesceExpression) was added formally in the 11th edition of ECMAScript. It is implemented as a logical operator to selectively return the result of one of two expressions (or operands) based on one of the expressions resolving to a "nullish" value. A nullish value in JavaScript is one that is `null` or `undefined`.

In particular, the operator - given by `??` - will return the right-hand side if the left-hand expression resolves to `null` or `undefined`, and otherwise returns the left-hand side.

```
const x = y ?? z;
```

In the example above, `z` will be returned if `y` is "nullish", and otherwise  `y` will be returned.

Nullish coalescing is similar to (but stricter than) the more commonly-seen logical OR operator - given by `||` - which returns the result of the right-hand side expression if the left-hand side resolves to any falsy value, which includes nullish ones in addition to the boolean `false`, empty string (`''`), `0`,  `NaN`, etc.

More info is [available on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) and Wikipedia discusses null coalescing in [other languages](https://en.wikipedia.org/wiki/Null_coalescing_operator).
