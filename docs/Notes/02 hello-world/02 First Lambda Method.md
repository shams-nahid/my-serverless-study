### First Lambda Method

---

- Select AWS Lambda service
- Select `Create Function`
- Select `Author From Scratch`
  - name `getRandomMessage`
  - Runtime `Node 14.x`
  - For permission, the lambda will create a basic role for the execution of the function
  - Click `Create Function`
- From source code, update `index.js` as,

```js
exports.handler = async event => {
  return 'Hello Lambda Function';
};
```

- Since these functions are event driven, we need to create a event to test the function. To test
  - Click `test`
  - Create event with no data and named `emptyEventData`
  - If we click the test again, we should see, success response with message `Hello Lambda Function`
