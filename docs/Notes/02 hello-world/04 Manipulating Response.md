### Manipulating Response

---

Previously, with mock endpoint, we used to get response `{ message: some_message }`. But now, we are getting response like `some_message` using the lambda endpoint. To manipulate the response message, we can make use of overriding the `Integration Response`.

- Back to `Method Execution Map` page
- Click the `Integration Response`
- Expand `Response -> Mapping Templates -> application/json`
- Our response should be `{ "message": "$input.body" }`
- Now back to method execution page and test
