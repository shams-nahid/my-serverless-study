### Architecture
---

At a high level, DynamoDB use a `Service Oriented Architecture`. It's a decoupled service, can be easily integrated with other AWS service seamlessly. Performance of DynamoDB is predefined and predictable. Internally dynamodb store data in the high performance SSD.

In each Partition, dynamoDB can hold at most 10GB of data. A partition can provide max 3000 RCU and 1000 WCU.

To ensure high availability, dynamoDB store data in 3 different AZ or facilities withing a region.

To store data in a certain partition, dynamoDB usage consistent hashing algorithm.