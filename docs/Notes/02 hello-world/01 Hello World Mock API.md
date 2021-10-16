### Hello World Mock API

---

- Go to Amazon API Gateway
- choose rest api
- resource is an api endpoint
  - resource name and path can be `message`
  - create a resource
- Create a method
  - methods handle rest-api-endpoints with get, post, patch, etc
  - select get protocol and create one
  - We can have various method, choose Mock one for simplicity
  - This works like, `Method Request -> Integration Request -> Integration Response -> Method Response`
  - Update the integration response for demo
    - select integration response
    - expand `Method Response -> Mapping Templates -> application/json`
    - in template, create a json object, `{ message: "Hello World" }`
- Deploy API
  - From action dropdown, select `Deploy API`
  - Select new stage with a stage name `test` and click deploy
- Stage
  - after deploy, we should go to the staging area with api endpoint
  - go to `provided_api_end_point/message` and we should see output of `Hello World`
- Quick Test
  - It is possible to test the api without deploying
  - Go to `Resources -> Get`
  - Click the `Test` button to go to the method execution page
  - We do not need any query string or headers, so click `Test` and verify the output `Hello World`
