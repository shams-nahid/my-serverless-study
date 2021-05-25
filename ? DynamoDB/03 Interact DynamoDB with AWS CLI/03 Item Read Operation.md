### Item Read Operation
---

- Get item by primary key
- Query operation by hash key and with sort key
- Scan operation across table partition
- Filter data after query

**Create sample Items For Read Operation**

First batch write these functions,

```json
{
    "td_notes_test": [
        {
            "PutRequest": {
                "Item": {
                    "user_id": {"S": "A"},
                    "timestamp": {"N": "1"},
                    "content": {"S": "Content A1"},
                    "title": {"S": "Title A1"},
                    "username": {"S": "User A"},
                    "cat": {"S": "general"},
                    "note_id": {"S": "n1"}
                }
            }
        },
        {
            "PutRequest": {
                "Item": {
                    "user_id": {"S": "B"},
                    "timestamp": {"N": "2"},
                    "content": {"S": "Content B2"},
                    "title": {"S": "Title B2"},
                    "username": {"S": "User B"},
                    "cat": {"S": "general"},
                    "note_id": {"S": "n2"}
                }
            }
        },
        {
            "PutRequest": {
                "Item": {
                    "user_id": {"S": "C"},
                    "timestamp": {"N": "3"},
                    "content": {"S": "Content C3"},
                    "title": {"S": "Title C3"},
                    "username": {"S": "User C"},
                    "cat": {"S": "general"},
                    "note_id": {"S": "n3"}
                }
            }
        },
        {
            "PutRequest": {
                "Item": {
                    "user_id": {"S": "A"},
                    "timestamp": {"N": "4"},
                    "content": {"S": "Content A4"},
                    "title": {"S": "Title A4"},
                    "username": {"S": "User A"},
                    "cat": {"S": "test"},
                    "note_id": {"S": "n4"}
                }
            }
        },
        {
            "PutRequest": {
                "Item": {
                    "user_id": {"S": "B"},
                    "timestamp": {"N": "5"},
                    "content": {"S": "Content B5"},
                    "title": {"S": "Title B5"},
                    "username": {"S": "User B"},
                    "cat": {"S": "test"},
                    "note_id": {"S": "n5"}
                }
            }
        },
        {
            "PutRequest": {
                "Item": {
                    "user_id": {"S": "C"},
                    "timestamp": {"N": "6"},
                    "content": {"S": "Content C6"},
                    "title": {"S": "Title C6"},
                    "username": {"S": "User C"},
                    "cat": {"S": "test"},
                    "note_id": {"S": "n6"}
                }
            }
        },
        {
            "PutRequest": {
                "Item": {
                    "user_id": {"S": "A"},
                    "timestamp": {"N": "7"},
                    "content": {"S": "Content A7"},
                    "title": {"S": "Title A7"},
                    "username": {"S": "User A"},
                    "cat": {"S": "todo"},
                    "note_id": {"S": "n7"}
                }
            }
        },
        {
            "PutRequest": {
                "Item": {
                    "user_id": {"S": "B"},
                    "timestamp": {"N": "8"},
                    "content": {"S": "Content B8"},
                    "title": {"S": "Title B8"},
                    "username": {"S": "User B"},
                    "cat": {"S": "todo"},
                    "note_id": {"S": "n8"}
                }
            }
        },
        {
            "PutRequest": {
                "Item": {
                    "user_id": {"S": "C"},
                    "timestamp": {"N": "9"},
                    "content": {"S": "Content C9"},
                    "title": {"S": "Title C9"},
                    "username": {"S": "User C"},
                    "cat": {"S": "todo"},
                    "note_id": {"S": "n9"}
                }
            }
        },
        {
            "PutRequest": {
                "Item": {
                    "user_id": {"S": "A"},
                    "timestamp": {"N": "10"},
                    "content": {"S": "Content A10"},
                    "title": {"S": "Title A10"},
                    "username": {"S": "User A"},
                    "cat": {"S": "aws"},
                    "note_id": {"S": "n10"}
                }
            }
        }
    ]
}
```

**Read By Primary Key**

To read a item by primary key, we can first create a file named `read-key.json`, and the `read-key.json` file will be like,

```json
{
    "user_id": {
        "S": "A"
    },
    "timestamp": {
        "N": "1"
    }
}
```

Now get the item using,

```bash
aws dynamodb get-item --table-name td_notes_test --key file://read-key.json
```

We should get the item.

**Query Data**

Lets we want to query all the items with partition key `A`. Now we need a file for expression attribute values.

Create a file named `expression-attribute-values.json`, similar like,

```json
{
    ":uid": {
        "S": "A"
    }
}
```

Now execute the query by,

```bash
aws dynamodb query --table-name td_notes_test --key-condition-expression "user_id = :uid" --expression-attribute-value file://expression-attribute-values.json
```

We should get all the 4 items, all with partition key `A`.

Now if we want all the items that have partition key `A` and sort key `timestamp` are greater than `5`, create a new `expression-attribute-values-for-comparison.json` file,

```json
{
    ":uid": {
        "S": "A"
    },
    ":t": {
        "N": 5
    }
}
```

Since we have the sort key named `timestamp`, it is a reserved keyword in the dynamodb. In this case, we have to use another file to use this key. The file name can be `expression-attribute-names-for-comparison.json` similar to,

```json
{
    "#t": "timestamp"
}
```

Now run the query,

```bash
aws dynamodb query --table-name td_notes_test --key-condition-expression "user_id = :uid AND #t > :t" --expression-attribute-value file://expression-attribute-values-for-comparison.json --expression-attribute-names file://expression-attribute-names-for-comparison.json
```

**Filtering Data**

Lets do a filtering on category, to get all the items with `todo` category.

Lets create `expression-attribute-values-for-filtering.json`,

```json
{
    ":uid": {
        "S": "A"
    },
    ":t": {
        "N": "5"
    },
    ":cat": {
        "S": "todo"
    }
}
```

We will use the previous query and use the filtering on the top of it,

```bash
aws dynamodb query --table-name td_notes_test --key-condition-expression "user_id = :uid AND #t > :t" --expression-attribute-value file://expression-attribute-values-for-filtering.json --expression-attribute-names file://expression-attribute-names-for-comparison.json --filter-expression "cat = :cat"
```

With additional flag, `--return-consumed-capacity` we can see the consumed capacity of the query.

With `--consistent-read` we can do strongly consistent.

**Multiple Get Items Batch Query**

**Scan Operation**

Scan operation simply go through the whole table and find data. In a single scan, we can get at most 1MB data. To get more data, we have to scan again with last scan result index.

A simple scan can be,

```bash
aws dynamodb scan --table-name td_notes_test
```

We can also add a filtering after the scan. To do so, first create a file, `scan-filtering-attribute-values.json`,

```json
{
    ":uname": {
        "S": "User B"
    }
}
```

Now run the scan + filtering,

```bash
aws dynamodb scan --table-name td_notes_test --filter-expression "username = :uname" --expression-attribute-values file://scan-filtering-attribute-values.json
```