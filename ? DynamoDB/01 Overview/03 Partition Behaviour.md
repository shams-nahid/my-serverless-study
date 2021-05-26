### Partition Behaviour
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
