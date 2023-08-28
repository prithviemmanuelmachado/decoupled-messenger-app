import { Alert, Grid, Snackbar } from "@mui/material";
import Form from "../../Components/form";
import { useEffect, useState } from "react";
import { registerUser, isUserRegistered } from "../../Components/server";
import { deleteMessage } from "../../Components/aws";

export default function Register(props){
    const { setIsLoading, darkModeState } = props;

    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [isPassMatch, setIsPassMatch] = useState(true);
    const [open, setOpen] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const [toastSeverity, setToastSeverity] = useState('error');

    const nameValidation = /^[a-zA-Z\s]{1,20}$/; 
    const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    useEffect(() => {
        if(password === cPassword){
            setIsPassMatch(true);
        }
        else{
            setIsPassMatch(false);
        }
    },[password, cPassword]);

    const onSubmit = () => {
        if(!nameValidation.test(fName))
            return;
        if(!nameValidation.test(lName))
            return;
        if(!emailValidation.test(email))
            return;
        if(!passwordValidation.test(password))
            return;
        if(!isPassMatch)
            return;
        const body = {
            fName,
            lName,
            email,
            darkModeState,
            password
        }
        setIsLoading(true);
        registerUser(JSON.stringify(body), (err) => {
            setToastSeverity('error');
            setToastMsg('Error while conneceting to server. Please try again later')
            setIsLoading(false);
            setOpen(true);
        }, (data) => {
            setIsLoading(false);
            setOpen(true);
            setToastMsg('test');
            setToastSeverity('error');
            isUserRegistered(() => {
                setToastSeverity('error');
                setToastMsg('Error while conneceting to server. Please try again later')
                setIsLoading(false);
                setIsLoading(false);
                setOpen(true);
            }, (res) => {
                setToastSeverity(res.status === '500' || res.status === '400' ? 'error' : 'success');
                setToastMsg(res.message);
                setIsLoading(false);
                setOpen(true);
                deleteMessage(res.messageHandle, err => console.log(err))
            }, data.MessageId, 0);
        })
    }

    const inputFields = [
        {
            gridWidth: 6,
            label: 'First Name',
            type: 'textField',
            value: fName,
            onChange: (e) => {
                setFName(e.target.value);
            },
            validationType: 'regex',
            validation: nameValidation,
            validationMessage: 'The first name must be between 1 and 20 charecters. No special characters allowed'
        },
        {
            gridWidth: 6,
            label: 'Last Name',
            type: 'textField',
            value: lName,
            onChange: (e) => {
                setLName(e.target.value);
            },
            validationType: 'regex',
            validation: nameValidation,
            validationMessage: 'The last name must be between 1 and 20 charecters. No special characters allowed'
        },
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
            gridWidth: 6,
            label: 'Password',
            type: 'password',
            value: password,
            onChange: (e) => {
                setPassword(e.target.value);
            },
            validationType: 'regex',
            validation: passwordValidation,
            validationMessage: 'Password should be between 8 and 16 characters long with atleast \none uppercase, one lowercase, one special character, one number'
        },
        {
            gridWidth: 6,
            label: 'Confirm password',
            type: 'password',
            value: cPassword,
            onChange: (e) => {
                setCPassword(e.target.value);
            },
            validationType: 'boolean',
            validation: !isPassMatch,
            validationMessage: 'Passwords do not match'
        }         
    ];

    return<>
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={6000}
            key={'topright'}>
            <Alert onClose={() => setOpen(false)} severity={toastSeverity} sx={{ width: '100%' }}>
                {toastMsg}
            </Alert>
        </Snackbar>
        <Grid
        container
        sx={{
            borderRadius: '10px',
            width: '90vw',
            height: '90vh',
            backgroundColor: 'primary.main',
            boxShadow: 3,
            padding: '30px 0 30px 30px', //top right bottom left
            display: 'flex'
        }}>
            <Grid item xs={9}>
                <Form
                    itemSpacing={10}
                    heading= {{
                        fontWeight: 'bold',
                        color: 'secondary.main',
                        variant: 'h4',
                        text: 'Register new user'
                    }}
                    itemContainerStyling={{width: '100%'}}
                    items={inputFields}
                    onSubmit={onSubmit}/>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={2} sx={{
                backgroundColor: 'secondary.main',
                width: '40%',
                height: '100%',
                borderRadius: '10px 0 0 10px',
                boxShadow: 1
            }}></Grid>
        </Grid>
    </>
}