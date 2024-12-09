---
title: "Using Gen AI to Build an Image Recognition System"
date: "Dec 4, 2024"
excerpt: ""
cover_image: "/images/posts/image-recognition-design/rekognition.png"
# hide_image_in_slug: true
---

## Serverless Developer Cert

Since my last [post](https://www.williamjonescodes.com/blog/differentiating-myself) about setting a goal to acquire several AWS certificates, I have earned the Cloud Practitioner and Serverless Developer certificates. I find working in the cloud fun and interesting. The suite of available tools makes building systems fast. There is no shortage of options when it comes to piecing together the ideal stack to solve an issue. I cannot recommend Cloudquest enough because it offers the ability to dive into technologies and designs that would otherwise run up a bill in independent projects.

The serverless developer track was even more engaging than the Cloud Practitioner. Throughout the process, I built 24 different solutions using AWS serverless technologies. One of the last projects was an image recognition system. I found this project intriguing and wanted to cement the knowledge in my brain, so I wrote this article on the project.

## Overview of the Project

### Building an Image Recognition System with Gen AI

The solution uses AWS serverless services to create an end to end image recognition and labeling system.

<img src="/images/posts/image-recognition-design/system_design_1.png" alt="overall design" title="overall design"  />

The system is deployed using the AWS cloud development kit. (AWS CDK) in three distinct stacks.

#### The API stack

is composed of an AWS Lambda function that retreives an image from a web server and stores that image in an Amazon Simple Storage Service Bucket

<img src="/images/posts/image-recognition-design/system_design_2.png" alt="api stack" title="api stack"  />

The Lambda function is invoked by the user through an API hosted on Amazon API Gateway. When an image is stored in the S3 bucket an event notification places a message into an Amazon Simple Notification Service (Amazon SNS) topic.

The SNS topic then delivers the message to a subscriber Amazon Simple Queue Service (Amazon SQS) queue.

Before diving into the recognition stack, let's summarize the Amazon Rekognition technology.

---

#### AWS Rekognition

makes it easy to add image and video analysis to applications. The service can identify people, scenes, objects, text, and activities. It can detect inappropriate content. It can detect analyze and compare faces for a wide variety of user verification, people counting, and public safety use cases. based on amazon deep learning technology

##### Key benefits

- Simple integration via easy-to-use apis. No machine learning expertise required.
- Fully managed and provides consistent response times even as request volume increases to tens of millions of requests.
- It is continually learning from new data.
- Batch and real-time analysis

  - Video streaming using Amazon Kinesis video streams can be analyzed in real time.
  - Images can be analyzed as they are uploaded to Amazon S3.
  - For large jobs images and videos can be analyzed in batches.

- Low cost
  - Only pay for the number of images or minutes of videos you analyze, and face data you store for verification.
- Easily integrate face based verification into new or existing applications.

##### Key Features

- Identify thousands of objects, scenes, and activities
- Capture pathing in videos - example: analyze athlete movement for post game analysis
- Facial recognition is fast and accurate, with the ability to search a private repository of face images
- Crowd mode face detection can detect and analyze up to 100 faces in a single image
- Identify potentially unsafe or inappropriate content across images and videos
- Control content via moderation levels
- Facial analysis - demographic data, emotions, gender, age, general attributes like eyes open or glasses
- Celebrity recognition identifies well-known people in image libraries
- Recognize text from real world images such as street names, products, and license plates

---

#### The Recognition Stack's

lambda function is invoked by the work item from the API stack queue.

<img src="/images/posts/image-recognition-design/system_design_3.png" alt="recognition stack" title="recognition stack"  />

This Lambda function uses Amazon Rekognition to create labels for the image that is stored in the S3 bucket.

The Lambda function stores these labels in an Amazon DynamoDB table and places a message in the integration stack SNS topic.

The user can retrieve the labels from the DynamoDB table by issuing an API call that invokes the list images Lambda function.

#### The Integration Stack

is the final piece of this system. When the image recognition Lambda function places a message in the integration stack SNS topic, the message is delivered to the subscriber SQS queue. This new work item in the SQS queue invokes the integration Lambda function. The Lambda function converts the message to XML format and sends a POST request to the third-party server via API Gateway.

<img src="/images/posts/image-recognition-design/system_design_4.png" alt="integration stack" title="integration stack"  />

### The Code

In this project AWS provides a zip file that the user is expected to unzip, follow instructions to set up a Python environment, and proceed through a series of steps to complete code snippets. For each project, AWS Cloud Quest provisions an AWS environment that allows access to the resources required to complete the required steps.

The project directory looks like the following

```txt
- project
  - python
    - api
      - runtime
        - get_save_image.py
      -infrastucture.py
    - integration
      - runtime
        - send_email.py
      -infrastructure.py
    - recognition
      - runtime
        - image_recognition.py
        - list_images.py
      -infrastructure.py
    - app.py
    - cdk.json
    - requirements.txt
```

#### API

The API, integration, and recognition folders represent each stack of the overall system. Each file in the integration folder holds a class representing the stack, including its associated AWS technologies and configurations.
This is all done via the [AWS CDK](https://aws.amazon.com/cdk/), which allows one to define the required cloud resources in a programming language of their choice instead of manually using the AWS UI in the browser.

When inspecting the main app.py file we can see

```python
#!/usr/bin/env python3
import aws_cdk as cdk
from api.infrastructure import APIStack
from integration.infrastructure import IntegrationStack
from recognition.infrastructure import RekognitionStack

DEFAULT_REGION = 'us-east-1'

app = cdk.App()


apiStack = APIStack(
    app, "APIStack", env=cdk.Environment(region=DEFAULT_REGION))

integrationStack = IntegrationStack(
    app, "IntegrationStack", env=cdk.Environment(region=DEFAULT_REGION))


RekognitionStack(
    app,
    "RekognitionStack",
    sqs_url=apiStack.sqs_url,
    sqs_arn=apiStack.sqs_arn,
    sns_arn=integrationStack.sns_arn,
    env=cdk.Environment(region=DEFAULT_REGION)
)

app.synth()

```

Example of the API stack integration file.

```python
from constructs import Construct
from aws_cdk import Duration
from aws_cdk import aws_lambda as lambda_
from aws_cdk import aws_s3 as s3
from aws_cdk import aws_apigateway as apigateway
from aws_cdk import aws_sqs as sqs
from aws_cdk import aws_sns_subscriptions as sns_subs
from aws_cdk import aws_sns as sns
from aws_cdk import aws_s3_notifications as s3n
from aws_cdk import Stack
from aws_cdk import aws_iam as iam


class APIStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Using pre-created roles to avoid givin iam:CreateRole to lab cdk cfn deploy role
        # https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_iam/CustomizeRolesOptions.html
        iam.Role.customize_roles(
            self,
            use_precreated_roles={
                "APIStack/BucketNotificationsHandler050a0587b7544547bf325f094a3db834/Role": "cdk-apistack-role",
                "APIStack/ImageGetAndSaveLambda/ServiceRole": "cdk-apistack-role",
            },
        )

        bucket = s3.Bucket(self, "CW-Workshop-Images")

        asset_bucket = s3.Bucket.from_bucket_name(
            scope=self,
            id="lamba_layer_zipfile",
            bucket_name="TO BE PROVIDED",
        )

        requests_layer_file = (
            "requests_layer3_11.zip"
        )

        requests = lambda_.LayerVersion(
            self,
            "requests_layer",
            compatible_runtimes=[lambda_.Runtime.PYTHON_3_11],
            layer_version_name="requests_layer",
            code=lambda_.S3Code(bucket=asset_bucket, key=requests_layer_file),
        )

        image_get_and_save_lambda = lambda_.Function(
            self,
            "ImageGetAndSaveLambda",
            function_name="ImageGetAndSaveLambda",
            runtime=lambda_.Runtime.PYTHON_3_11,
            layers=[requests],
            code=lambda_.Code.from_asset("api/runtime"),
            handler="get_save_image.handler",
            environment={"BUCKET_NAME": bucket.bucket_name},
        )

        bucket.grant_read_write(image_get_and_save_lambda)

        api = apigateway.RestApi(
            self,
            "REST_API",
            rest_api_name="Image Upload Service",
            cloud_watch_role=False,
            description="CW workshop - upload image for workshop.",
        )

        get_image_integration = apigateway.LambdaIntegration(
            image_get_and_save_lambda,
            request_templates={"application/json": '{ "statusCode": "200" }'},
        )

        api.root.add_method("GET", get_image_integration)

        upload_queue = sqs.Queue(
            self, id="uploaded_image_queue", visibility_timeout=Duration.seconds(30)
        )

        self.upload_queue_url = upload_queue.queue_url
        self.upload_queue_arn = upload_queue.queue_arn

        sqs_subscription = sns_subs.SqsSubscription(
            upload_queue, raw_message_delivery=True
        )

        upload_event_topic = sns.Topic(self, id="uploaded_image_topic")

        upload_event_topic.add_subscription(sqs_subscription)

        bucket.add_event_notification(
            s3.EventType.OBJECT_CREATED_PUT, s3n.SnsDestination(upload_event_topic)
        )

    @property
    def sqs_url(self) -> str:
        return self.upload_queue_url

    @property
    def sqs_arn(self) -> str:
        return self.upload_queue_arn
```

Completed get_save_image.py file

```python
import os
import json
import boto3
import requests
import botocore.exceptions

s3_client = boto3.client("s3")
S3_BUCKET = os.getenv('BUCKET_NAME')

#1 Create function to download the content from a url without a filename and print any request exception.
def get_file_from_url(url):
    try:
        response = requests.get(url)
        return response.content
    except requests.exceptions.RequestException as e:
        print(e)

#2 Create a function to upload the file to s3 and print any exception.
def upload_image_to_s3(bucket, key, data):
    """
    Uploads an image to S3
    """
    try:
        print("Uploading image to S3")
        s3_client.put_object(Body=data, Bucket=bucket, Key=key)
        return True
    except botocore.exceptions.ClientError as e:
        print("Error uploading image to S3")
        print(e)
        return False


def handler(event, context):
    url = event["queryStringParameters"]["url"]
    name = event["queryStringParameters"]["name"]

    # call method #1 to download image
    data = get_file_from_url(url)

    # call mehtod #2 to upload image to s3
    upload_image_to_s3(S3_BUCKET, name, data)


    return {
        'statusCode': 200,
        'body': json.dumps('Successfully Uploaded Img!')
    }

```

After each completing the code above we deploy the API stack to the cloud with the cdk deploy command.

We then make a curl request to upload an image via the newly deployed API.

```bash
curl "$(aws cloudformation describe-stacks --stack-name APIStack --query "Stacks[0].Outputs[0].OutputValue" --region us-east-1 --output text)?name=img-01.jpg&url=https://m.media-amazon.com/images/I/61IxvVh3M8L._AC_SX679_.jpg"
```

We can now see the uploaded image in the S3 bucket that was created by our cdk deploy command.

<img src="/images/posts/image-recognition-design/img_in_s3_bucket.png" alt="img_in_s3_bucket" title="img_in_s3_bucket"  />
<img src="/images/posts/image-recognition-design/dog.jpg" alt="dog-upload-image" title="dog-upload-image"  />

### Recognition

Lets review integration.py, the completed image_recognition.py, and list_images.py files.

- integration.py

```python
"""
RekognitionStack CDK
"""
# declare SQS that reacts to image upload SNS
# declare SNS to where it sends the items

from aws_cdk import (
    aws_iam as iam,
    aws_lambda as _lambda,
    aws_dynamodb as ddb,
    aws_apigateway as apigateway,
    aws_s3 as s3,
    Stack,
)
from constructs import Construct


class RekognitionStack(Stack):
    """
    RekognitionStack class is a CDK stack that
    creates a DynamoDB table, an SQS queue, and an SNS topic.
    """

    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        sqs_url: str,
        sqs_arn: str,
        sns_arn: str,
        **kwargs
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        iam.Role.customize_roles(
            self,
            use_precreated_roles={
                "RekognitionStack/image_recognition/ServiceRole": "cdk-rekognition-role",
                "RekognitionStack/ListImagesLambda/ServiceRole": "cdk-rekognition-role",
                "": "",
            },
        )

        # create new IAM group and user
        group = iam.Group(self, "RekGroup")
        user = iam.User(self, "RekUser")

        # add IAM user to the new group
        user.add_to_group(group)

        # create DynamoDB table to hold Rekognition results
        table = ddb.Table(
            self,
            "Classifications",
            partition_key=ddb.Attribute(name="image", type=ddb.AttributeType.STRING),
        )

        # create Lambda function
        lambda_function = _lambda.Function(
            self,
            "image_recognition",
            runtime=_lambda.Runtime.PYTHON_3_11,
            handler="image_recognition.handler",
            code=_lambda.Code.from_asset("recognition/runtime"),
            environment={
                "TABLE_NAME": table.table_name,
                "SQS_QUEUE_URL": sqs_url,
                "TOPIC_ARN": sns_arn,
            },
        )

        lambda_function.add_event_source_mapping(
            "ImgRekognitionLambda", event_source_arn=sqs_arn
        )

        # add Rekognition permissions for Lambda function
        rekognition_statement = iam.PolicyStatement()
        rekognition_statement.add_actions("rekognition:DetectLabels")
        rekognition_statement.add_resources("*")
        lambda_function.add_to_role_policy(rekognition_statement)

        # add SNS permissions for Lambda function
        sns_permission = iam.PolicyStatement()
        sns_permission.add_actions("sns:publish")
        sns_permission.add_resources("*")
        lambda_function.add_to_role_policy(sns_permission)

        # grant permission for lambda to receive/delete message from SQS
        sqs_permission = iam.PolicyStatement()
        sqs_permission.add_actions("sqs:ChangeMessageVisibility")
        sqs_permission.add_actions("sqs:DeleteMessage")
        sqs_permission.add_actions("sqs:GetQueueAttributes")
        sqs_permission.add_actions("sqs:GetQueueUrl")
        sqs_permission.add_actions("sqs:ReceiveMessage")
        sqs_permission.add_resources("*")
        lambda_function.add_to_role_policy(sqs_permission)

        # grant permissions for lambda to read/write to DynamoDB table
        table.grant_read_write_data(lambda_function)

        # grant permissions for lambda to read from bucket
        s3_permission = iam.PolicyStatement()
        s3_permission.add_actions("s3:get*")
        s3_permission.add_resources("*")
        lambda_function.add_to_role_policy(s3_permission)

        # add additional API Gateway and lambda to list ddb
        list_img_lambda = _lambda.Function(
            self,
            "ListImagesLambda",
            function_name="ListImagesLambda",
            runtime=_lambda.Runtime.PYTHON_3_11,
            code=_lambda.Code.from_asset("recognition/runtime"),
            handler="list_images.handler",
            environment={"TABLE_NAME": table.table_name},
        )

        api = apigateway.RestApi(
            self,
            "REST_API",
            rest_api_name="List Images Service",
            cloud_watch_role=False,
            description="CW workshop - list images recognized from workshop.",
        )

        list_images = apigateway.LambdaIntegration(
            list_img_lambda,
            request_templates={"application/json": '{ "statusCode": "200" }'},
        )

        api.root.add_method("GET", list_images)

        table.grant_read_data(list_img_lambda)

```

- image_recognition.py

```python
import os
import boto3
import json

sqs = boto3.client("sqs")
rekognition = boto3.client("rekognition")
dynamodb = boto3.client("dynamodb")
sns = boto3.client("sns")

queue_url = os.environ["SQS_QUEUE_URL"]
table_name = os.environ["TABLE_NAME"]
topic_arn = os.environ["TOPIC_ARN"]

# 1 Use Rekognition to detect max of 10 labels with a confidence of 70 percent.
def detectImgLabels(bucket_name, key, maxLabels=10, minConfidence=70):
    image = {
        "S3Object": {
            "Bucket": bucket_name,
            "Name": key
        }
    }
    response = rekognition.detect_labels(Image=image, MaxLabels=10, MinConfidence=70)
    return response


# 2 Write labels to DynamoDB given a table name and item.
def writeToDynamoDb(tableName, item):
    dynamodb.put_item(
        TableName=tableName,
        Item=item
    )

# 3 Publish item to SNS
def triggerSNS(message):
    response = sns.publish(
        TopicArn=topic_arn,
        Message=message,
        Subject="CodeWhisperer Workshop Success!",

    )
    print(response)

# 4 Delete message from SQS
def deleteFromSqs(receipt_handle):
    sqs.delete_message(
        QueueUrl=queue_url,
        ReceiptHandle=receipt_handle
    )


def handler(event, context):
    print(event)
    try:
        # process message from SQS
        for Record in event.get("Records"):
            receipt_handle = Record.get("receiptHandle")
            for record in json.loads(Record.get("body")).get("Records"):
                bucket_name = record.get("s3").get("bucket").get("name")
                key = record.get("s3").get("object").get("key")

                # call method #1 to generate image label and store as var "labels"
                labels = detectImgLabels(bucket_name=bucket_name, key=key)
                print(key, labels["Labels"])

                # code snippet to create dynamodb item from labels
                db_result = []
                json_labels = json.dumps(labels["Labels"])
                db_labels = json.loads(json_labels)
                for label in db_labels:
                    db_result.append(label["Name"])
                db_item = {
                    "image": {"S": key},
                    "labels": {"S": str(db_result)}
                }

                # call method #2 to store "db_item" result on DynamoDB
                writeToDynamoDb(tableName=table_name, item=db_item)

                # call method #3 sending db_result as a string to trigger SNS.
                triggerSNS(str(db_result))

                # call method #4 to delete img from SQS.
                deleteFromSqs(receipt_handle=receipt_handle)

    except Exception as e:
        print(e)
        print("Error processing object {} from bucket {}. ".format(key, bucket_name))
        raise e
```

- list_images

```python
import os
import boto3
import json

table_name = os.environ["TABLE_NAME"]

#1 create Function to scan and list all items from a DynamoDB table.
def list_items(table_name):
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(table_name)
    response = table.scan()
    items = response['Items']
    return items


def handler(event, context):
    # call method #1 to scan items from DynamoDB and put them in a variable named response.
    response = list_items(table_name)

    return {
        "body": json.dumps(response),
        "statusCode": 200
    }
```

Following the completion of these files we deploy them to the cloud with another cdk deploy command.

After the deployment is completed, we can add upload another image via a curl request and inspect the results of the system with the newly added Rekognition stack.

Below we send a curl request to the rekognition stack to see the labels defined from the uploaded image.

```bash
curl "$(aws cloudformation describe-stacks --stack-name RekognitionStack --query "Stacks[0].Outputs[0].OutputValue" --region us-east-1 --output text)"
```

We get a response of

```txt
[{"image": "img-01.jpg", "labels": "['Dog House', 'Den', 'Indoors', 'Kennel', 'Animal', 'Canine', 'Dog', 'Mammal', 'Pet']"}](.venv)
```

### Integration

Finally lets inspect the files of the integration stack.

- infrastucture.py

```python
import aws_cdk as cdk
from aws_cdk import Stack
from constructs import Construct
from aws_cdk import Duration
from aws_cdk import aws_sqs as sqs
from aws_cdk import aws_sns_subscriptions as sns_subs
from aws_cdk import aws_sns as sns
from aws_cdk import aws_lambda as lambda_
from aws_cdk import aws_lambda_event_sources as lambda_events
from aws_cdk import aws_s3 as s3


class IntegrationStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        rekognized_queue = sqs.Queue(
            self, id="rekognized_image_queue", visibility_timeout=Duration.seconds(30)
        )

        sqs_subscription = sns_subs.SqsSubscription(
            rekognized_queue, raw_message_delivery=True
        )

        rekognized_event_topic = sns.Topic(self, id="rekognized_image_topic")

        self.rekognized_event_topic_arn = rekognized_event_topic.topic_arn
        rekognized_event_topic.add_subscription(sqs_subscription)

        asset_bucket = s3.Bucket.from_bucket_name(
            scope=self,
            id="lamba_layer_zipfile",
            bucket_name="bucket_name",
        )

        requests_layer_file = (
            "requests_layer3_11.zip"
        )

        requests = lambda_.LayerVersion(
            self,
            "requests_layer",
            compatible_runtimes=[lambda_.Runtime.PYTHON_3_11],
            layer_version_name="requests_layer",
            code=lambda_.S3Code(bucket=asset_bucket, key=requests_layer_file),
        )

        integration_lambda = lambda_.Function(
            self,
            "IntegrationLambda",
            runtime=lambda_.Runtime.PYTHON_3_11,
            layers=[requests],
            handler="send_email.handler",
            code=lambda_.Code.from_asset("integration/runtime"),
        )

        integration_lambda.add_to_role_policy(
            statement=cdk.aws_iam.PolicyStatement(
                actions=["ssm:GetParameter"], resources=["*"]
            )
        )

        invoke_event_source = lambda_events.SqsEventSource(rekognized_queue)
        integration_lambda.add_event_source(invoke_event_source)

    @property
    def sns_arn(self) -> str:
        return self.rekognized_event_topic_arn
```

- send_email.py

```python
from xml.etree.ElementTree import Element, tostring
import requests
import boto3


def get_thirdparty_endpoint():
    '''
    Get thirdparty endpoint from SSM Parameter Store
    '''
    ssm_client = boto3.client('ssm', region_name='us-east-1')
    response = ssm_client.get_parameter(
        Name='thirdparty_endpoint', WithDecryption=False)
    return response['Parameter']['Value']


#1 Convert JSON data to XML string
def json_to_xml(event):
    root = Element('root')
    for key, value in event.items():
        child = Element(key)
        child.text = str(value)
        root.append(child)
    return tostring(root)


#2 Send XML string with HTTP POST
def post_xml(xml_string):
    endpoint = get_thirdparty_endpoint()
    headers = {'Content-Type': 'application/xml'}
    response = requests.post(get_thirdparty_endpoint(),
                             data=xml_string, headers=headers)
    return response


def handler(event, context):

    # call method #1 with var "event" to convert json to xml
    xml_string = json_to_xml(event)
    print(xml_string)

    # call method #2 to post xml
    response = post_xml(xml_string)
    print(response)

    return {
        'statusCode': 200,
        "message": "Success!"
    }

```

The final stack once deployed sends a post request containing the xml with image categorization created in the recognition stack when ever an image is uploaded to the API stack.

If you have made it with me this far, thanks for reading. I hope this was informative and interesting. I am planning to write another article on how one could integrate similar technologies into workflows containing step functions that stitch together services and conditionally take actions based on the results from rekognition analysis.

Cheers!

Will
