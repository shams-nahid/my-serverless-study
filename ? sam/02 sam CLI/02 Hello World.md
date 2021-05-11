### Hello World

--

cmd: sam init

cmd: echo '{}' | sam local invoke HelloWorldFunction
{"statusCode":200,"body":"{\"message\":\"hello world\"}"}

cmd: sam local start-lambda

create a node app with aws sdk `resource/sam/sam-app/test-app`

invoking the test.js inside `resource/sam/sam-app/test-app` will invoke the lambda method and response 

```json
{
  StatusCode: 200,
  Payload: '{"statusCode":200,"body":"{\\"message\\":\\"hello world\\"}"}'
}
```