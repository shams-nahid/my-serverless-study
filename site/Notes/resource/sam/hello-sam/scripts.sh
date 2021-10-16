# creating a s3 bucket
aws s3 mb s3://test-s3-for-sam

# creating cloudformation template
aws cloudformation package --template-file template.yaml --output-template-file sam-template.yaml --s3-bucket test-s3-for-sam

# Deploy cloudformation template
aws cloudformation deploy --template-file sam-template.yaml --stack-name hello-sam-stack --capabilities CAPABILITY_IAM