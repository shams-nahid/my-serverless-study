### Data Types

---

DynamoDB supports 3 types of data,

1. Scalar Types: Can be string, number, binary, boolean, null etc.
2. Set Types: Multiple Scaler types / Array of Scaler types
3. Document Types: allows lists and maps

**Lists**: Ordered collection of values, can have multiple data types

**maps**: JSON Documents

**Good to Know**

- Key or index of any tables can only be scalar types of string, number or binary.
- String or Binary can not be an empty value
- When it comes to sets, empty sets are not allowed
- A set can not contain duplicate values
