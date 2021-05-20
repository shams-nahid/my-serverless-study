### Database Schema

---

```yml
service: tour-assistant-api
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
  stage: prod
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

functions:
  add-events:
    handler: api/events/add-event.handler
    description: POST /event
    events:
      - http:
          path: event
          method: post
          cors:
            origin: '*'
            headers: ${self:custom.allowedHeaders}
  get-events:
    handler: api/events/get-events.handler
    description: GET /events
    events:
      - http:
          path: events
          method: get
          cors:
            origin: '*'
            headers: ${self:custom.allowedHeaders}

resources:
  Resources:
    TourAssistantTable:
      Type: AWS::DynamoDB::Table
      DeletionPolicy: Retain
      Properties:
        TableName: ${self:provider.environment.TOUR_ASSISTANT_TABLE}
        AttributeDefinitions:
          - AttributeName: title
            AttributeType: S
          - AttributeName: eventDate
            AttributeType: N
          - AttributeName: eventId
            AttributeType: S
          - AttributeName: district
            AttributeType: S
        KeySchema:
          - AttributeName: title
            KeyType: HASH
          - AttributeName: eventDate
            KeyType: RANGE
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
        GlobalSecondaryIndexes:
          - IndexName: eventId-index
            KeySchema:
              - AttributeName: eventId
                KeyType: HASH
            Projection:
              ProjectionType: ALL
            ProvisionedThroughput:
              ReadCapacityUnits: 1
              WriteCapacityUnits: 1
          - IndexName: district-index
            KeySchema:
              - AttributeName: district
                KeyType: HASH
            Projection:
              ProjectionType: ALL
            ProvisionedThroughput:
              ReadCapacityUnits: 1
              WriteCapacityUnits: 1
```
