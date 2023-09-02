# decoupled-messenger-app
> **Find the backend code in this link: https://github.com/prithviemmanuelmachado/decoupled-messenger**
<br/><br/>

## Overview
**Note: This is not a responsive app as that is not the goal of this exercise. The main goals of this project is**

> * Build a cloud native app<br />
> * Have the front end and the back end decoaupled using AWS SQS<br />
> * Use AWS S3 as a storage<br />
> * Implement CICD using code pipeline<br />
> * Use Cloudformation to demonstrate use of Infrastructure as code<br />

## Order to read the files to understand flow  
1. /messenger/src/index
2. /messenger/src/App
3. /messenger/src/Containers -> /messenger/src/Components (as needed)

## Environment varaiables
The environment variables need to be placed in a .env file in the root folder, here /messenger<br />
The following variables are used 
* REACT_APP_SERVER_REQ_QUEUE= --url of the queues holding the requests--
* REACT_APP_SERVER_RES_QUEUE=--url of the queues holding the responses--
* REACT_APP_ACCESS_KEY=--access key generated for the aws account that can access the queues--
* REACT_APP_SECRET_ACCESS_KEY=--secret key generated for the aws account that can access the queues--
* REACT_APP_REGION=--aws region that holds the queue--
* REACT_APP_BUCKET=--S3 bucket name--

## AWS services used
* SQS -> for messaging
* S3 -> for storing media file uploads
* Codepipeline -> for CICD

## AWS related prep WRT server function
* Setup for common functions that deal with sqs messaging is done in /messenger/src/Components/aws.js
* The functions that are called when an action is performed, that would traditionally call api, are stored in /messenger/src/Components/server.js
* Create an S3 bucket that can be accessed publically
* Public access should also be reflected in the bucket policy
* To improve security you can use signed URL feature and disable public access, but modify the code to reflect the same

## AWS related prep WRT CICD
* Work in progress

## About the app
* Attempting to have a push and forget type system
* Some features like registering new user, though requires polling for particular response after message is pushed to request queue
* Other auth services like AWS cognito can be implemented to better help the flow of the app, but the aim of this project is to try to implement decoupling and sqs as much as possible
* Features that wait for respones to proceed
    * Register
    * Login
* Features that push message and forget
    * Search user
    * Send message
    * Set darkmode
    * Mark read message
* An sqs recive message job runs on loop when logged in that handles all the session responses
* On login we recive at min 100 messages
* Every subsequent application message is recived in an individual sqs message and appanded to the correct user
* The results of searches are stored in seperate array so that the original array can keep being updated an not be disrupted by the search