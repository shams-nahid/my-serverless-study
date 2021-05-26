### Capacity Units

---

DynamoDB tables are isolated from each other and hence, we can tune the performance of them individually.

We tune the performance using the `Throughput Capacity`. This throughput capacity allows dynamoDB to ensure predictable performance for the tables according to our needs.

Before we go to the `Throughput Capacity`, we need to look out the `Capacity Units`. In DynamoDB, there are two types of capacity units,

1. **RCU**: Read capacity units. 1 RCU stands for 1 strongly consistent read per second or 2 eventually consistency read per second up to 4KB of item data.
2. **WCU**: Write capacity units. 1 WCU stands for 1 write per second with 1KB of item data.

DynamoDB pricing depends on these `RCUs` and `WCUs`. We have to pay AWS by the number of `RCU` and `WCU`.

DynamoDB has a feature called `Burst Capacity`, which can be used when the application exceeds the `Throughput Capacity`.

A partition can have maximum 1000 WCUs and 3000 RCUs.

> A table can have multiple partitions. So table is not bound by the partitions capacity units.

> With on demand capacity model, we do not event have to define the throughput capacity. Using on demand caoacity model can be more pricy.
