### Naming Convention

---

In most SQL/NoSQL, database is the top label entity. Inside the database, we create multiple tables. But in DynamoDB, tables are the top label label entity. All the tables in a aws region consider as a single database.

In order to better organize our tables with related organization, a good approach is to follow some naming convention.

We can use any of the followings for a table name,

- projectName.tableName
- projectName_TableName
