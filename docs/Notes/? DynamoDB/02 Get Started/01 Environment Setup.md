### Environment Setup

---

**Requirements**

- AWS Account
- AWS CLI
- Node.js

To install aws CLI go to [Install CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html) and [Configure CLI](https://blog.shams-nahid.com/upload-files-and-folder-to-s3-from-ubuntu-20-04-using-aws-cli-2-2dd44f544809)

**Test Setup**

Create a directory named, `test-installation`,

```bash
mkdir test-installation
```

Go to the directory and create a node project,

```bash
cd test-installation
npm init -y
```

Install `aws-sdk`,

```bash
npm i aws-sdk
```

Create a file named, `index.js`

```bash
touch index.js
```

Our index.js file should be similar like,

```js
const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-south-1" });

const dynamoDB = new AWS.DynamoDB();

dynamoDB.listTables((err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
```

If we got output something like, `{ TableNames: [] }`, then the setup is done. Instead of empty array, it could have table name if exist in that region.
