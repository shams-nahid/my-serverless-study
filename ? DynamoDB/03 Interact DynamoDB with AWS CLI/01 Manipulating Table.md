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
