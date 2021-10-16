### Integrate a Lambda Function with API Gateway

---

- Go to API Gateway we created earlier
- Click on the `Integration Request`
- As `Integration Type` select `Lambda`
- Region should be the region we are using to create `Lambda` function
- As `Lambda Function` put the name of of the `Lambda Function Name`, we created earlier
- Click save and confirm
- To test, Go to get method, and click `test`. We should see the response message `Hello From Lambda`
