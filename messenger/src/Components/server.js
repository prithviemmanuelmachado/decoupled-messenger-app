import { sendMessage, receiveMessage } from "./aws";

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
        },
        token: {
        DataType: 'String',
        StringValue: sessionStorage.getItem('authToken')
        }
    }, () => null, () => null);
    sessionStorage.removeItem('sessionUrl');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('darkModeState');
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
    }, null);
}

export function loopCheckMessage(errfnc, successfnc, stopLoopJob) {
    receiveMessage(errfnc, (data) => {
        if(data.Messages){
            successfnc(data);
        }
        if(sessionStorage.getItem('sessionUrl') === undefined || sessionStorage.getItem('sessionUrl') === null || stopLoopJob)
            return;
        setTimeout(() => {
            loopCheckMessage(errfnc, successfnc)
        }, 500)
    }, sessionStorage.getItem('sessionUrl'));
}

export function sendSearchUser(model){
    sendMessage(model,{
        controller: {
        DataType: 'String',
        StringValue: 'user'
        },
        method: {
        DataType: 'String',
        StringValue: 'searchUser'
        },
        token: {
        DataType: 'String',
        StringValue: sessionStorage.getItem('authToken')
        },
        sessionUrl: {
        DataType: 'String',
        StringValue: sessionStorage.getItem('sessionUrl')
        }
    }, () => null, () => null);
}

export function storeDarkModeState(model){    
    sendMessage(model, {
        controller: {
        DataType: 'String',
        StringValue: 'user'
        },
        method: {
        DataType: 'String',
        StringValue: 'setDarkModeState'
        },
        token: {
        DataType: 'String',
        StringValue: sessionStorage.getItem('authToken')
        },
        sessionUrl: {
        DataType: 'String',
        StringValue: sessionStorage.getItem('sessionUrl')
        }
    }, () => null, () => null);
}

export function selectSearchUser(model){
    sendMessage(model,{
        controller: {
        DataType: 'String',
        StringValue: 'message'
        },
        method: {
        DataType: 'String',
        StringValue: 'selectSearchUser'
        },
        token: {
        DataType: 'String',
        StringValue: sessionStorage.getItem('authToken')
        },
        sessionUrl: {
        DataType: 'String',
        StringValue: sessionStorage.getItem('sessionUrl')
        }
    }, () => null, () => null);
}

export function saveMessage(model){
    sendMessage(model,{
        controller: {
        DataType: 'String',
        StringValue: 'message'
        },
        method: {
        DataType: 'String',
        StringValue: 'add'
        },
        token: {
        DataType: 'String',
        StringValue: sessionStorage.getItem('authToken')
        },
        sessionUrl: {
        DataType: 'String',
        StringValue: sessionStorage.getItem('sessionUrl')
        }
    }, (err) => console.log(err), () => null);
}

export function markMessagesAsRead(model){
    sendMessage(model,{
        controller: {
        DataType: 'String',
        StringValue: 'message'
        },
        method: {
        DataType: 'String',
        StringValue: 'markMessagesAsRead'
        },
        token: {
        DataType: 'String',
        StringValue: sessionStorage.getItem('authToken')
        },
        sessionUrl: {
        DataType: 'String',
        StringValue: sessionStorage.getItem('sessionUrl')
        }
    }, (err) => console.log(err), () => null);
}

