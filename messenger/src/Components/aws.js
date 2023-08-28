const AWS = require('aws-sdk');

const REQURL = process.env.REACT_APP_SERVER_REQ_QUEUE;
const RESURL = process.env.REACT_APP_SERVER_RES_QUEUE;
const SQS_CONFIG = {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_REGION,
};

const receiveMessageParams = {
    MaxNumberOfMessages: 10,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 10,
    MessageAttributeNames: ['All'],
};
  
const sqs = new AWS.SQS(SQS_CONFIG);
  
export function sendMessage(data, attributes = null, errorfnc, successfnc) {
    let params = {
        MessageBody: data,
        QueueUrl: REQURL,
    };
  
    if (attributes) {
      params.MessageAttributes = attributes;
    }

    sqs.sendMessage(params, function (err, data) {
      if (err) {
        errorfnc(err);
      } else {
        successfnc(data);
      }
    });
}

export function receiveMessage(errfnc, successfnc){
    const params = {
      ...receiveMessageParams,
      QueueUrl: RESURL,
    };
  
    sqs.receiveMessage(params, (err, data) => {
      if (err) {
        errfnc(err);
      }
      else{
        successfnc(data)
      }
    });
};

export function deleteMessage(id, errfnc){
  sqs.deleteMessage(
    {
      QueueUrl: RESURL,
      ReceiptHandle: id,
    },
    function (err, data) {
      if(err){
        errfnc(err);
      }
    }
  );
};