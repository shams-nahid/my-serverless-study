### Table Create Operation

---

While creating a table, it is recommended to use a string as primary key rather than number, since string has much more variety compare to number. For sort key, it is recommended to use a number. These are not rules, just some recommendation.

When we create a table, we must include the local secondary index. We can not delete/alter/change these indexes after a table being created.

All local secondary index should have the same partition key.

Using the `Projected Attributes` we can determine which item attribute will be stored in the indexing other than the partition key and the sort key.

- With `includes` type `Project Attributes`, we can define, which attributes should be included in the indexing
- With `All` type of `Project Attributes`, all the item attributes will be included in the indexing
- With `Keys` type of the `Project Attributes`, only the partition key and sort key will be included in the indexing.

By selecting proper types of `Projected Attributes` we can reduce the size of the table.
