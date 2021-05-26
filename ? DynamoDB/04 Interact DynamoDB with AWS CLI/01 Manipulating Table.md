### Manipulating Table

---

**Table List**

To get list of tables using,

```bash
aws dynamodb list-tables
```

This should give the list of tables already being created.

**Table Details**

To see a specific table metadata, we can use,

```bash
aws dynamodb describe-table --table-name table_name
```

This should return all the metadata of the table, like attributes, types, indexes etc.

**Create Table**

```bash
aws dynamodb create-table \
    --table-name td_notes_test \
    --attribute-definitions \
        AttributeName=user_id,AttributeType=S \
        AttributeName=timestamp,AttributeType=N \
    --key-schema \
        AttributeName=user_id,KeyType=HASH \
        AttributeName=timestamp,KeyType=RANGE \
    --provisioned-throughput \
        ReadCapacityUnits=1,WriteCapacityUnits=1
```

In response we should get `TableStatus: "CREATING"` in json format.

We can verify table,

```bash
aws dynamodb describe-table --table-name td_notes_test
```

Also the table should be listed in the following commands output,

```bash
aws dynamodb list-tables
```

**Delete a Table**

We can delete a table by the name,

```bash
aws dynamodb delete-table --table-name td_notes_test
```

In response we should get `TableStatus: "DELETING"` in json format.
