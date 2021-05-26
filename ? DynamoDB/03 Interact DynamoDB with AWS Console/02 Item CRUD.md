### Item CRUD

---

From `ui -> items` we can do

- scan
- query

When we query data in table, we can do some filtering along with it. In DynamoDB, filtering take place after the query is performed and data is retrieved. Adding/removing filtering does not affect the RCU or WCU.

For number type, we can query/filter by equal, greater, smaller, not greater, not smaller etc.
