### Item Operations

---

If there is no table named `td_notes_test` exist, create one by,

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

To add or replace an item we use the `put` operation. To update a item, we use `update` operation.

**Create Item**

With `put` operation, we can create a item or completely replace an existing item by matching with the primary key.

Create a JSON file, we want to add to the dynamoDB table, named `item.json`. Our `item.json` can be very similar to,

```json
{
  "user_id": {
    "S": "uuid_1"
  },
  "timestamp": {
    "N": "1621865859"
  },
  "title": {
    "S": "title 1"
  },
  "content": {
    "S": "content 1"
  }
}
```

Now put the item to dynamodb `td_notes_test` table by,

```bash
aws dynamodb put-item --table-name td_notes_test --item file://item.json
```

If we go to dynamoDB console, we should see the new item.

Similarly, we can change the `item.json` file and create new items.

If we have a JSON item with same primary key and we do a put operation, it will completely replace all the attributes of the previous one and instead use the new one.

**Update Item**

To update a item, we will need three json files,

In the `key.json` file we have to define the primary key of the item. Our `key.json` be like,

```json
{
  "user_id": { "S": "uuid_1" },
  "timestamp": { "N": "1621865859" }
}
```

In the `attribute-names.json` file we have to define the attribute we wants to update with variable start with `#`. Our `attribute-names.json` file be like,

```json
{
  "#t": "title"
}
```

In the `attribute-values.json` file, we have to put the updated content for the attribute. Our `attribute-values.json` file should be like,

```json
{
  ":t": {
    "S": "Updated Variable"
  }
}
```

Here in `attribute-values.json` file, the `t` comes from the `attribute-names.json` file.

Now we update the item by,

```bash
aws dynamodb update-item --table-name td_notes_test \
    --key file://key.json \
    --update-expression "SET #t = :t" \
    --expression-attribute-names file://attribute-names.json \
    --expression-attribute-values file://attribute-values.json
```

Now if we go to console an check the item with primary key `{ user_id: "uuid_1", timestamp: "1621865859" }`, we should see the title as `Updated title`

**Delete Item**

To delete an item we have to put the primary key in a JSON file. We already have similar JSON file named `key.json`. So we can simply delete by,

```json
aws dynamodb delete-item --table-name td_notes_test --key file://key.json
```

In the console, we should see the item with `key.json` primary key is deleted.

**Batch Write Item**

With batch writing we can perform multiple `put` or `delete` operation. Let's create a file for the operation named, `items.json`. Our `items.json` file should be similar to,

```json
{
  "td_notes_test": [
    {
      "PutRequest": {
        "Item": {
          "user_id": {
            "S": "uuid_1"
          },
          "timestamp": {
            "N": "1621865861"
          },
          "title": {
            "S": "title 1"
          },
          "content": {
            "S": "content 1"
          }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "user_id": {
            "S": "uuid_2"
          },
          "timestamp": {
            "N": "1621865862"
          },
          "title": {
            "S": "title 2"
          },
          "content": {
            "S": "content 2"
          }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "user_id": {
            "S": "uuid_3"
          },
          "timestamp": {
            "N": "1621865863"
          },
          "title": {
            "S": "title 3"
          },
          "content": {
            "S": "content 3"
          }
        }
      }
    },
    {
      "DeleteRequest": {
        "Key": {
          "user_id": {
            "S": "uuid_d"
          },
          "timestamp": {
            "N": "123456"
          }
        }
      }
    }
  ]
}
```

No do the batch write operation,

```bash
aws dynamodb batch-write-item --request-items file://items.json
```

With batch write we can update at most 16MB od data.
