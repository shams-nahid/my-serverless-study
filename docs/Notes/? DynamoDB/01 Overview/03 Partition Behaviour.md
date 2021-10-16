### Partition Behavior

---

**Theory for calculating Number Of Partition**

Number of Partition based on throughput requirement,

P(t) = Round( (RCUs / 3000) + (WCUs / 1000) )

Number of Partition based on storage requirement,

P(s) = Round( (Storage Required) / 10 GB )

Final partition, based on throughput and storage is,

P = Max (P(t), P(s))

> For decimal point, aws took the next rounded number

**Example 1 for calculating Number Of Partition**

```
RCU: 1000
WCU: 500
Storage: 5GB
```

Partition based on Throughput = (1000 / 3000) + (500 / 1000) = 0.67 ~ 1

Partition based on storage = 5 / 10 = 0.5 ~ 1

Final Partition number = max (1, 1) = 1

**Example 2 for calculating Number Of Partition**

```
RCU: 1000
WCU: 500
Storage: 50GB
```

Partition based on Throughput = (1000 / 3000) + (500 / 1000) = 0.67 ~ 1

Partition based on storage = 50 / 10 = 5

Final Partition number = max (1, 5) = 5

In this case, there will be 5 partition, each have

```
(1000 / 5) = 200 RCUs
(500 / 1) = 5 WCU
(50 / 5) = 10 GB Storage
```

**Keeping Ratio of Provision Capacity And Storage Size**

If the storage size grows to 500 GB, ultimately, each partition will get only 20 RCU and 10 WCU.

We can see, the more table size grows, the provision capacity WCU and RCU decrease. We should consider increasing the provision capacity as the storage size grows.

To meet the desired performance, we have to upgrade the performance up to 50 times more. And the cost will also be 50 times more.

**A Cost Effective Solution**

Splitting data in multiple table can reduce a lot of cost. We can put the most frequently needed data in a table and less frequently needed data in another table. This will allow to keep the frequently accessed table size low and hence can get more WCU and RCU from the partitions.

**Migrating Data From SQL**

Migrating 5GB data to dynamoDB.

When we put the data to DynamoDB, with 5GB storage, 1000RCU and 500 WCU, we can consider only one partition.

For storages, P(s) (5/10) = .5 ~ 1 partition

For throughput capacity, P(t) = (1000 / 3000) + (500 / 1000) = 0.67 partition

Final Partition = Max (Pt, Ps) = 1

So on a running database, we will require only one partition.

But when we migrate the database, from SQL to dynamoDB, to put each of rows from SQL to dynamoDB, we have a lot of write operation and this will require a lot of WCUs.

To save costing, we may consider scale up the WCUs to 5000 and after couple of hours we can scale down the WCUs. This will save a lot of costing.

But in this context, we have to consider, high number of WCUs will also increase the partition number.

With 5000 WCUs,

```
Pt = (1000/3000) + 5000 / 1000 = 5.3 ~ 6
Ps = 5 / 10 = .5 ~ 1
```

Number of partition = Max (Pt, Ps) = Max(6, 1) = 6

After migration completed, dynamoDB will de-allocated the partition from 6 to 1. But when it's comes to WCUs and RCUs, dynamoDB will still use the max number of partition 6.

In this case, for the single running partition, we will get

```
(1000 / 6) = 167 RCUs (We expected 1000 RCUs)
(500 / 6) = 83 WCUs (We expected 500 WCUs)
```

Now, if we need the desired performance, we have to increase the throughput capacity to 6 times more. This will also increase the costing. This means, we accidentally increase the costs 6 times.

One way could be migrate table data without scaling up the WCUs.

Another approach could be design table differently and migrate data to multiple tables to boost up the process. If splitting is not a process, need to distribute data in different partition carefully.
