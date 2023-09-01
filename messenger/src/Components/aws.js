const AWS = require('aws-sdk');


const REQURL = process.env.REACT_APP_SERVER_REQ_QUEUE;
const RESURL = process.env.REACT_APP_SERVER_RES_QUEUE;
const CONFIG = {
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_REGION,
};

const sqs = new AWS.SQS(CONFIG);
const s3 = new AWS.S3(CONFIG);

const receiveMessageParams = {
    MaxNumberOfMessages: 10,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 10,
    MessageAttributeNames: ['All'],
};

export function uploadFiles(data, success){
  console.log('file upload triggered');
  let key = data.name;
  let name = key.split('.');
  let ext = name.pop();
  name = name.join('_');
  name = name.split(' ').join('_')
  key = name.split('+').join('_');
  key = key+ '_' + Date.now() + '.' + ext;
  s3.putObject({
    Key: key,
    Body: data,
    Bucket: process.env.REACT_APP_BUCKET
  }, (err, idata)=> {
    if(err){
      console.log(err);
    }
    else{
      console.log('file uploaded')
      success({
        url: 'https://'+process.env.REACT_APP_BUCKET+'.s3.'+process.env.REACT_APP_REGION+'.amazonaws.com/'+key,
        type: data.type,
        size: data.size
      });
    }
  } )
}
  
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

export function receiveMessage(errfnc, successfnc, url){
    const params = {
      ...receiveMessageParams,
      QueueUrl: url === null ? RESURL : url,
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

export function deleteMessage(id, errfnc, url){
  sqs.deleteMessage(
    {
      QueueUrl: url ? url : RESURL,
      ReceiptHandle: id,
    },
    function (err, data) {
      if(err){
        errfnc(err);
      }
    }
  );
};