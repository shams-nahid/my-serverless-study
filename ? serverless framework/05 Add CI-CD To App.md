### Add CI/CD To App

---

Create a `buildspec.yml`,

```yml
version: 0.2

phases:
  install:
    commands:
      - echo installing serverless...
      - npm install -g serverless
  pre_build:
    commands:
      - echo installing npm dependencies
      - npm install
  build:
    commands:
      - echo deployment started on `date`
      - echo deploying with serverless framework
      - sls deploy -v -s $ENV_NAME
  post_build:
    commands:
      - echo deployment completed on `date`
```

**Set Up Git Repository**

**Set Up Code Pipeline**

- Create a role for code build
  - Go to IAM
  - Go to roles
  - Create role
  - Select code build
  - Add permission
  - Add policy of `Administrator Access`
  - Put a name
  - Review and create the role
- Go to `Code Pipeline`.
- create code pipeline
- name `tour-assistant-api-code-pipeline`
- Let the role name as it is
- Source Provider
  - as `AWS Code Commit`
  - as `Github`
    - Connect github
    - Allow access
- Repo name `tour-assistant-api`
- Branch name `master`
- Build Provider `AWS Codebuild`
- Select region `ap-south-1`
- Create Project
- Set Up Code Build
  - Project name `tour-assistant-api-code-build`
  - Operating System `Ubuntu`
  - Runtime `Standard`
  - Image `aws/codebuild/standard:4.0`
  - Role `codebuild serverless admin` **How to create this role**
  - From additional config,
    - add `ENV_NAME` as `prod`
      - Make sure the stage under provider is `${opt:stage, 'dev'}`
    - add `AWS_ACCESS_KEY_ID`
    - add `AWS_DEFAULT_REGION`
    - add `AWS_SECRET_ACCESS_KEY`
  - `Continue to Code Pipeline`
- Skip Deploy Stage
-
