service: tour-assistant-api
frameworkVersion: '2'

plugins:

- serverless-offline

custom:
allowedHeaders: - Accept - Content-Type - Content-Length - Authorization - X-Amz-Date - X-Api-Key - X-Amz-Security-Token - X-Amz-User-Agent

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
TourAssistantTable: ${self:service}-${opt:stage, self:provider.stage}
