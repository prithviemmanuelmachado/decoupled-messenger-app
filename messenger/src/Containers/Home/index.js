import { Grid, Typography } from "@mui/material";
import SingleInput from "../../Components/input";
import { sendSearchUser } from "../../Components/server";
import User from "../../Components/user";
import Message from "../../Components/message";
import { Box } from "@mui/system";
import { uploadFiles } from "../../Components/aws";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

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
        setMessage,
        clearSearch
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
                        setValue={e => {
                            if(e.target){
                                setSearchUser(e.target.value)
                            }else{
                                setSearchUser('');
                            }
                        }}
                        onSearch={() => {
                            //send message to search user
                            sendSearchUser(JSON.stringify({name: searchUser}))
                        }}
                        onClear={clearSearch}
                        searchGrid={2}
                        clearGrid={2}/>
                </Grid>
                <Grid item container xs={10} direction='column' alignItems='stretch'>
                    <Box sx={{ overflowY: 'scroll', width: '410px', height: '595px'}}>
                    {
                        listOfUsers.length === 0 ? 
                        <Typography sx={{
                            color: 'secondary.contrastText',
                            fontSize: '10rem',
                            textAlign: 'center',
                            marginTop: '6rem'
                        }}>
                            <SentimentVeryDissatisfiedIcon fontSize='inherit'/> <br/>
                            <Typography sx={{
                                color: 'secondary.contrastText',
                                fontSize: '1.5rem',
                                fontWeight: 'bold'
                            }}>
                            Big empty <br/>No friends? 
                            </Typography>
                        </Typography>: 
                        listOfUsers.map((ele, index) => {
                            return <>
                                <User
                                loadMessages={(e) => {
                                    loadMessages(e);
                                }}
                                userInfo={ele}
                                isSelected={ele.userID === selected.userID}/>
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
                        selected.userID === undefined ?
                        <Typography sx={{
                            fontSize: '10rem',
                            textAlign: 'center'
                        }} >
                            <RemoveCircleIcon sx={{
                            color: 'secondary.main',
                            fontSize: 'inherit',
                            marginTop: '6rem',
                            animation: "spin 2s linear infinite",
                            "@keyframes spin": {
                            "100%": {
                                transform: "rotate(360deg)",
                            },
                            "0%": {
                                transform: "rotate(0deg)",
                            },
                            }
                            }}/>
                            <Typography sx={{
                                color: 'secondary.main',
                                fontSize: '1.5rem',
                                fontWeight: 'bold'
                            }}>
                            Great nothings
                            </Typography>
                        </Typography>
                        :displayMessages.map((ele, index) => {
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
                        isSendActive={selected.userID === undefined}
                        color='primary'
                        value={message}
                        setValue={(e) => {
                            if(e.target){
                                setMessage(e.target.value)
                            } else {
                                setMessage('')
                            }
                        } }
                        onSend={addMessage}
                        onUpload={(e) => {
                            const files = e.target.files;
                            console.log('upload triggered : ', files)
                            Object.values(files).forEach(file => {
                                uploadFiles(file,data => addMessage(data));
                            });
                        }}
                        sendGrid={1}
                        uploadGrid={1}/>
                </Grid>
            </Grid>
        </Grid>
        
    </>
}

export default Home;