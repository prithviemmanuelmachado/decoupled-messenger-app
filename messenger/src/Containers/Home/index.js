import { Grid, Typography } from "@mui/material";
import SingleInput from "../../Components/input";
import { useState } from "react";
import { sendSearchUser } from "../../Components/server";
import User from "../../Components/user";


function Home(props){
    const { 
        setIsLoading, 
        listOfUsers,
        setListofUsers } = props;
    const [searchUser, setSearchUser] = useState('');
    const [message, setMessage] = useState('');
    console.log(listOfUsers.length === 0);

    return<>
        <Grid container spacing={0} sx={{
            width: '80vw',
            height: '90vh',
            boxShadow: 1
        }}>
            <Grid item container direction='column' alignItems='stretch' xs={4} sx={{
                backgroundColor: 'secondary.main'
            }}>
                <Grid item container xs={1} sx={{
                    backgroundColor: 'secondary.input'
                }}>
                    <SingleInput 
                        placeholder='Search user'
                        color='primary'
                        value={searchUser}
                        setValue={setSearchUser}
                        onSearch={() => {
                            sendSearchUser(JSON.stringify({name: searchUser}))
                        }}
                        onClear={() => {
                            setSearchUser('');
                        }}
                        searchGrid={2}
                        clearGrid={2}/>
                </Grid>
                <Grid item container xs={10} direction='column' alignItems='stretch'>
                    {
                        listOfUsers.length === 0 ? 
                        <Typography sx={{
                            color: 'secondary.contrastText',
                            fontWeight: 'bold',
                            fontSize: '3rem'
                        }}>
                            Big empty..... <br/>No friends?
                        </Typography>: 
                        listOfUsers.map((ele, index) => {
                            return <>
                                <User
                                userInfo={ele}/>
                            </>
                        })
                        
                    }
                </Grid>
            </Grid>
            <Grid item container direction='column' alignItems='stretch' xs={8} sx={{
                backgroundColor: 'primary.main'
            }}>
                <Grid item xs={10}>
                    Message display
                </Grid>
                <Grid item xs={1} sx={{
                    backgroundColor: 'secondary.input'
                }}>
                    <SingleInput 
                        placeholder='Search user'
                        color='primary'
                        value={message}
                        setValue={setMessage}
                        onSend={() => {
                            console.log(message);
                        }}
                        onUpload={() => {
                            console.log('upload')
                        }}
                        sendGrid={1}
                        uploadGrid={1}/>
                </Grid>
            </Grid>
        </Grid>
        
    </>
}

export default Home;