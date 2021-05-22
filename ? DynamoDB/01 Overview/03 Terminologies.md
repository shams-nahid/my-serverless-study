### Terminologies

---

| SQL     |                 DynamoDB |
| :------ | -----------------------: |
| Tables  |                   Tables |
| Rows    |                    items |
| Columns |               Attributes |
| Indexes |  Local Secondary Indexes |
| Views   | Global Secondary Indexes |

In SQL, it is possible a table exist with no primary key. But in DynamoDB, there should be a primary key and the primary key can consist of max two attributes.

The primary key of DynamoDB consists of

1. Partition Key (HASH Type)
2. Sort key (Range Type)

When we query on the DynamoDB, we have to use the primary key and this makes the DynamoDB super fast. Although we can scan to the DB without primary key but this is not efficient compare to query with primary key.

In DynamoDB, tables are totally separate entity, there is no concept of `Foreign Key relationship` here. Although, it seems to be a limitation, but having no strict relationship between tables has some great benefits. like,

- Without table joins, this makes the table queries highly efficient
- Allow provision appropriate capacity for each tables, so we can get predictable performance
