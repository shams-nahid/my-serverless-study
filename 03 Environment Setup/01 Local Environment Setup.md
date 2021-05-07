### Local Environment Setup

---

**Create User**

- Go to `IAM` service
- Go to `users` from left navigation
- Select `Add User`
- username can be `serverless-admin`
- check the `Programmatic access`
- As permission, add `AdministratorAccess` from `existing policy`

**Configure CLI**

- Follow the instruction section of `Install AWS CLI In Local Machine` from [here](https://bmshamsnahid.medium.com/upload-files-and-folder-to-s3-from-ubuntu-20-04-using-aws-cli-2-2dd44f544809)
- Run `aws configure`
- Put the access key, secret and region

Another way to temporary setup can be,

```
export AWS_ACCESS_KEY_ID=access_key_id
export AWS_SECRET_ACCESS_KEY=secret_access_key
export AWS_DEFAULT_REGION=default_region
```

To verify the proper CLI setup,

```bash
aws sts get-caller-identity
```

This should output the userId, account and ARN.
