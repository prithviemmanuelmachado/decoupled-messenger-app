import { Grid, Typography } from "@mui/material";
import SingleInput from "../../Components/input";
import { useState } from "react";
import { sendSearchUser } from "../../Components/server";
import User from "../../Components/user";
import Message from "../../Components/message";
import { Box } from "@mui/system";
import { uploadFiles } from "../../Components/aws";


function Home(props){
    const {
        setIsLoading,
        listOfUsers,
        displayMessages,
        loadMessages,
        searchUser,
        setSearchUser,
        selected,
        addMessage,
        message,
        setMessage
     } = props;

    return<>
        <Grid container spacing={0} sx={{
            width: '80vw',
            height: '600px',
            boxShadow: 1
        }}>
            <Grid item container direction='column' alignItems='stretch' xs={4} sx={{
                backgroundColor: 'secondary.light'
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
                            //send message to search user
                            //sendSearchUser(JSON.stringify({name: searchUser}))
                        }}
                        onClear={() => {
                            setSearchUser('');
                        }}
                        searchGrid={2}
                        clearGrid={2}/>
                </Grid>
                <Grid item container xs={10} direction='column' alignItems='stretch'>
                    <Box sx={{ overflowY: 'scroll', width: '410px', height: '595px'}}>
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
                                loadMessages={(e) => {
                                    loadMessages(e);
                                }}
                                userInfo={ele}
                                isSelected={ele.userID === selected}/>
                            </>
                        })
                    }
                    </Box>
                </Grid>
            </Grid>
            <Grid item container direction='column' alignItems='stretch' xs={8} sx={{
                backgroundColor: 'primary.main'
            }}>
                <Grid item xs={10} container direction='row' alignItems={'flex-end'}>
                    <Grid id='messageBox' sx={{ overflowY: 'scroll', height: '600px', width: '850px', paddingBottom: '10px' }}>
                    {
                        displayMessages.map((ele, index) => {
                            return <>
                            <Message body={ele.body} date={ele.dateTime} isToMe={ele.to === null}/>
                            </>
                        })
                    }
                    </Grid>
                </Grid>
                <Grid item xs={1} sx={{
                    backgroundColor: 'secondary.input'
                }}>
                    <SingleInput
                        isSendActive={selected !== ''}
                        color='primary'
                        value={message}
                        setValue={setMessage}
                        onSend={addMessage}
                        onUpload={(e) => {
                            const files = e.target.files;
                            Object.values(files).forEach(file => {
                                uploadFiles(file);
                            });
                        }}
                        sendGrid={1}
                        uploadGrid={1}
                        selected={selected}/>
                </Grid>
            </Grid>
        </Grid>
        
    </>
}

export default Home;