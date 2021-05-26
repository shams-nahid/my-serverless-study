### Consistency Model

---

When we write data in DynamoDB, it initially write the data in a single AZ and then replicate it in at least two other AZ.

In this context, DynamoDB provide 2 types of consistency,

1. **Strong Consistency**: When we fetch data after being write in the DynamoDB table, we will always get the up-to-date data.
2. **Eventual Consistency**: Fetching data after being written, may not always give the latest result.

In DynamoDB, with eventual consistency, data used to replicate in nearly 1/2 seconds. With applications context, this 1/2 second(s) can make huge difference. Also, another thing to keep in mind, eventual consistency have almost half of the pricing compare to the strongly consistency model.
