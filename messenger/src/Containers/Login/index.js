import Form from "../../Components/form";
import { Grid } from "@mui/material";
import { useState } from "react";
import Toast from "../../Components/toast";
import { login, retryCheckMessage } from "../../Components/server";
import { useNavigate } from "react-router-dom";
import { deleteMessage } from "../../Components/aws";

function Login(props){
    const { setIsLoading, setIsUserLoggedIn, setDarkModeState } = props;
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const [toastSeverity, setToastSeverity] = useState('error');

    const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    const inputFields = [
        {
            gridWidth: 12,
            label: 'Email',
            type: 'textField',
            value: email,
            onChange: (e) => {
                setEmail(e.target.value);
            },
            validationType: 'regex',
            validation: emailValidation,
            validationMessage: 'Enter valid email'
        },
        {
            gridWidth: 12,
            label: 'Password',
            type: 'password',
            value: password,
            onChange: (e) => {
                setPassword(e.target.value);
            },
            validationType: 'regex',
            validation: passwordValidation,
            validationMessage: 'Password should be between 8 and 16 characters long with atleast \none uppercase, one lowercase, one special character, one number'
        }     
    ];
    
    const onSubmit = () => {
        if(!emailValidation.test(email))
            return;
        if(!passwordValidation.test(password))
            return;
        const body = {
            email,
            password
        }
        setIsLoading(true);
        login(JSON.stringify(body), (err) => {
            setToastSeverity('error');
            setToastMsg('Error while conneceting to server. Please try again later')
            setIsLoading(false);
            setOpen(true);
        }, (data) => {
            retryCheckMessage(() => {
                setToastSeverity('error');
                setToastMsg('Error while conneceting to server. Please try again later')
                setIsLoading(false);
                setIsLoading(false);
                setOpen(true);
            }, (res) => {
                setToastSeverity(res.status === '500' || res.status === '400' ? 'error' : 'success');
                setToastMsg(res.body.message);
                setIsLoading(false);
                setOpen(true);
                if(res.status === '200'){
                    sessionStorage.setItem('authToken', res.body.token);
                    sessionStorage.setItem('darkModeState', res.body.darkModeState);
                    setDarkModeState(res.body.darkModeState)
                    setIsUserLoggedIn(true);
                    setTimeout(() => navigate('/'), 3000);
                }
                deleteMessage(res.messageHandle, err => console.log(err))
            }, data.MessageId, 0);
        })
    }

    return<>
        <Toast
            open={open}
            setOpen={setOpen}
            toastMsg={toastMsg}
            toastSeverity={toastSeverity}/>
        <Grid
        container
        sx={{
            borderRadius: '10px',
            width: '50vw',
            height: '70vh',
            backgroundColor: 'primary.main',
            boxShadow: 3,
            padding: '30px 0 30px 30px', //top right bottom left
            display: 'flex'
        }}>
            <Grid item xs={12}>
                <Form
                    itemSpacing={10}
                    heading= {{
                        fontWeight: 'bold',
                        color: 'secondary.main',
                        variant: 'h4',
                        text: 'Login'
                    }}
                    itemContainerStyling={{width: '100%'}}
                    items={inputFields}
                    onSubmit={onSubmit}
                    link={{
                        to: '/register',
                        text: 'Register new user'
                    }}/>
            </Grid>
        </Grid>
    </>
}

export default Login;