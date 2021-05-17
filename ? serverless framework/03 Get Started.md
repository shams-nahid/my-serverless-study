### Get Started

---

create a project
cmd: serverless

core `serverless.yml` file

```yml
service: name-of-the-project
frameworkVersion: '2'

plugins:
  - serverless-offline

custom:
  allowedHeaders:
    - Accept
    - Content-Type
    - Content-Length
    - Authorization
    - X-Amz-Date
    - X-Api-Key
    - X-Amz-Security-Token
    - X-Amz-User-Agent

provider:
  name: aws
  runtime: nodejs12.x
  lambdaHashingVersion: 20201221
  region: ap-south-1
  stage: dev
  memorySize: 128
  timeout: 5
  endpointType: regional
  environment:
    TOUR_ASSISTANT_TABLE: ${self:service}-${opt:stage, self:provider.stage}
  iamRoleStatements:
    - Effect: 'Allow'
      Action:
        - dynamodb:Query
        - dynamodb:PutItem
        - dynamodb:DeleteItem
      Resource: 'arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.TOUR_ASSISTANT_TABLE}'

resources:
  Resources:
    NotesTable:
      Type: AWS::DynamoDB::Table
      DeletionPolicy: Retain
      Properties:
        TableName: ${self:provider.environment.TOUR_ASSISTANT_TABLE}
        AttributeDefinitions:
          - AttributeName: uuid
            AttributeType: S
          - AttributeName: title
            AttributeType: S
          - AttributeName: date
            AttributeType: N
        KeySchema:
          - AttributeName: uuid
            KeyType: HASH
          - AttributeName: timestamp
            KeyType: RANGE
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
        GlobalSecondaryIndexes:
          - IndexName: date-index
            KeySchema:
              - AttributeName: date
                KeyType: RANGE
            Projection:
              ProjectionType: ALL
            ProvisionedThroughput:
              ReadCapacityUnits: 1
              WriteCapacityUnits: 1
```
