---
year: 2020
month: 10
day: 10
title: "JS Tidbit: Optional Chaining"
description: "Using the optional chaining JavaScript operator to improve code conciseness."
---

JavaScript has lots of handy tools for creating concise code and one-liners. One such tool is the optional chaining operator.

The optional chaining operator is useful for addressing an attribute of a deeply-nested object in which you cannot be fully certain that the successive levels of the object are valid at run-time.

For example, consider the following object.

```
const person = {
  name: 'Harry',
  occupation: 'student',
  enrolmentInformation: {
    contactDetails: {
      email: 'harry@hogwarts.ac.uk',
      address: {
        firstLine: '4 Privet Drive',
        postCode: 'GU3 4GH'
      }
    }
  }
};
```

In order to **safely** (i.e. if you cannot guarantee each object level at run-time) read the nested `postCode` attribute, you could do so like this, using the logical AND operator:

```
const enrolmentInfo = person && person.enrolmentInformation;
const contactDetails = enrolmentInfo && enrolmentInfo.contactDetails;
const address = contactDetails && contactDetails.address;
const postCode = address ^^ address.postCode;
```

Even in its single-line equivalent, this very quickly gets un-readable and messy.

The optional chaining operator (`?.`) makes this much easier:

```
const postCode = person?.enrolmentInformation?.contactDetails?.address?.postCode;
```

Or, using object destructuring and a logical OR:

```
const { postCode } = person?.enrolmentInformation?.contactDetails?.address || {};
```

Essentially, at each successive level, the optional chaining operator checks that the current attribute is non-nullish (i.e. not `null` or `undefined`) before proceeding to the next. If it does try to access a nullish attribute, the expression short-circuits and returns `undefined`, ignoring the rest of the chain.

Optional chaining also works in other scenarios:

```
const x = doubleArray[3]?.toFixed(2); // accessing array elements
const y = maybeArray?.[0]; // accessing an array that may exist
car.openDoors?.(); // calling methods on nested objects
```

For more info, see the [MDN reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining). 
