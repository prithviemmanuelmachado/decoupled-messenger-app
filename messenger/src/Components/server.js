import { sendMessage, receiveMessage, deleteMessage } from "./aws";

export function registerUser(model, error, success){
    sendMessage(model,{
        controller: {
        DataType: 'String',
        StringValue: 'user'
        },
        method: {
        DataType: 'String',
        StringValue: 'register'
        }
    }, error, success);
}

export function login(model, error, success){
    sendMessage(model, {
        controller: {
        DataType: 'String',
        StringValue: 'user'
        },
        method: {
        DataType: 'String',
        StringValue: 'login'
        }
    }, error, success);
}

export function logout(model){
    sendMessage(model, {
        controller: {
        DataType: 'String',
        StringValue: 'user'
        },
        method: {
        DataType: 'String',
        StringValue: 'logout'
        }
    }, () => null, () => null);
}

export function retryCheckMessage(errfnc, successfnc, msgId, retryCount) {
    if(retryCount == 4){
        errfnc();
    }
    receiveMessage(errfnc, (data) => {
        let isMsgRecived = false;
        if(data.Messages){
            data.Messages.forEach(element => {
                if(element.MessageAttributes.resTo.StringValue === msgId){
                    isMsgRecived = true;
                    const message = JSON.parse(element.Body)
                    const res = {
                        status: element.MessageAttributes.statusCode.StringValue,
                        body: message,
                        messageHandle: element.ReceiptHandle
                    }
                    successfnc(res);
                    return;
                }
            });
        }
        if(!isMsgRecived && retryCount < 4){
            setTimeout(() => {
                retryCheckMessage(errfnc, successfnc, msgId, retryCount + 1)
            }, 2000)
        }
    });
}
