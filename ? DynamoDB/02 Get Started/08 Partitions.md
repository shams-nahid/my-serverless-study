### Partitions

---

DynamoDB tables store the data inside partitions. These partitions are nothing but the memory blocks. Partitions are managed by the AWS but we can influenced AWS on partitioning the data to tune performance of the table.

**Partitions Spec**

- Can store at most 10 GB of data
- Can perform maximum 1000 WCUs or 3000 RCUs

In any case, if we exceed these spec, DynamoDB itself will allocate a new partition with zero downtime.
