import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './Containers/Login';
import Home from './Containers/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import Header from './Components/header';
import Register from './Containers/Register';
import Loader from './Components/loader';
import { logout, loopCheckMessage, selectSearchUser } from './Components/server';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { deleteMessage } from './Components/aws';
import Toast from './Components/toast';

const lightThemes = createTheme({
  palette:{
    primary: {
      main: '#BFFFC7',
      contrastText: '#00CD19',
      input: '#ACFFB6'        
    },
    secondary: {
      main: '#00CD19',
      contrastText: '#BFFFC7',
      input: '#80FF8F',
      scroll: '#008610', 
      selected: '#43FF5B' 
    },
    success: {
      main: '#1FAEE0',
      contrastText: '#BFFFC7'
    },
    info: {
      main: '#ECC913',
      contrastText: '#BFFFC7'
    },
    error: {
      main: '#FB0443',
      contrastText: '#BFFFC7'
    }
  },
  typography:{
    fontFamily: 'Rubik',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 700,
    fontWeightBold: 1000,
    fontSize: 15
  }
});
const darkThemes = createTheme({
  palette:{
    primary: {
      main: '#0B0041',
      contrastText: '#9400FF',
      input: '#08002D'
    },
    secondary: {
      main: '#9400FF',
      contrastText: '#0B0041',
      input: '#6500AF',
      scroll: '#4B0080', 
      selected: '#10005F'
    },
    success: {
      main: '#0B39F4',
      contrastText: '#0B0041'
    },
    info: {
      main: '#FF9000',
      contrastText: '#0B0041'
    },
    error: {
      main: '#FF000C',
      contrastText: '#0B0041'
    }
  },
  typography:{
    fontFamily: 'Rubik',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 700,
    fontWeightBold: 1000,
    fontSize: 15
  }
});

function App() {
  const [darkModeState, setDarkModeState] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [message, setMessage] = useState('');

  // listOfUsers data type
  // [{ 
  //    name: <user full name>,
  //    unreadMessages: <number of unread messages>,
  //    userID: <userID>
  // }]
  const [listOfUsers, setListofUsers] = useState([]);
  
  // listOfMessages data type
  // {<userID>: [{ 
  //    body: <
  //       text if normal message OR
  //       if attachment {url: <url to s3>, type: <type of attachment>}
  //    >,
  //    to: <null if i sent the message OR userID if someone else sent message>,
  //    dateTime: <dateTime of message in utf format>
  // }]}
  const [listOfMessages, setListofMessages] = useState({});
  const [displayMessages, setDisplayMessages] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [selected, setSelected] = useState({});
  const [open, setOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastSeverity, setToastSeverity] = useState('error');

  const loadMessages = (user) => {
    setSelected(user);
    if(listOfMessages[user.userID]){
      const users = listOfUsers;

      //update unread message count
      users.forEach((ele, index) => {
        if(ele.userID === user.userID){
          ele.unreadMessages = 0;
        }
      });
      setListofUsers(users);
      setDisplayMessages(listOfMessages[user.userID]);
    } else {
      setDisplayMessages([]);

      //send message to get last 20 messages from this user to me
      selectSearchUser(JSON.stringify({userID: user.userID}));

    }
  }
  const navigate = useNavigate();

  //testing
  // const printMainArrays = () => {
  //   console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  //   console.log('displayU :', displayUsers);
  //   console.log('displayM : ', displayMessages);
  //   console.log('listOfU : ', listOfUsers);
  //   console.log('listOfM : ', listOfMessages);
  // }

  //executed on load of page
  useEffect(() => {
    //printMainArrays();
    //listener to execute logout function on close of tab
    window.addEventListener('beforeunload', () => {
      logout(JSON.stringify({
          url: sessionStorage.getItem('sessionUrl')
      }));
      setIsUserLoggedIn(false);
    });

    //check auth
    //setDisplayUsers(listOfUsers);
    if(sessionStorage.getItem('authToken') === null){
      setIsUserLoggedIn(false);
      navigate('/login');
    }else{
      setDisplayUsers(listOfUsers);
      setIsUserLoggedIn(true);
      setDarkModeState(sessionStorage.getItem('darkModeState') === 'true')
    }
  }, []);

  //handle calling loop job on login
  useEffect(() => {
    if(isUserLoggedIn){
      loopCheckMessage((err) => console.log(err), (data) => {
        console.log(data);
        data.Messages.forEach(msg => {
          if(msg.MessageAttributes.statusCode.StringValue !== '200'){
            //session expired
            if(msg.MessageAttributes.statusCode.StringValue !== '401'){
              setToastSeverity('info');
              setTimeout(() => {
                window.location.reload();
              }, 4000);
            }else{
              setToastSeverity('error');
            }
            setToastMsg(msg.body.message);
            setOpen(true);
          }else{
            //results for user search
            if(msg.MessageAttributes.action.StringValue === 'searchUser'){
              setDisplayUsers(JSON.parse(msg.Body).listOfUsers);
            }

            //results of selecting a searched user
            if(msg.MessageAttributes.action.StringValue === 'selectSearchUser'){
              setDisplayMessages(JSON.parse(msg.Body));
            }
          }
          //delete message once processed
          deleteMessage(msg.messageHandle, err => null, sessionStorage.getItem('sessionUrl'));
        })
      }, !isUserLoggedIn);
    }
  }, [isUserLoggedIn])

  //local user serach
  useEffect(() => {
    //printMainArrays();
    const filtered = listOfUsers.filter((ele) => {
      return ele.name.toLowerCase().includes(searchUser.toLowerCase());
    })
    setDisplayUsers(filtered);
  },[searchUser]);

  useEffect(() => {
    //printMainArrays();
    //auto scroll to bottom of chat
    var messageBox = document.getElementById('messageBox');
    if(messageBox)
      messageBox.scrollTop = messageBox.scrollHeight;
  }, [displayMessages])

  const clearSearch = () => {
    //printMainArrays();
    setSearchUser('');
    setDisplayUsers([...listOfUsers]);
    setDisplayMessages([]);
  }

  const addMessage = (data) => {
    //printMainArrays();
    if(selected.userID){
      const msg = { body: data ? data : message, to: selected.userID, dateTime: new Date() };

      //move new user to top
      let uTemp = [...listOfUsers];
      let curUser = {};
      if(listOfMessages[selected.userID]){
        uTemp.forEach((ele, index) => {
          if(ele.userID === selected.userID){
            curUser = ele;
            uTemp.splice(index, 1);
          }
        })
      }else{
        curUser = selected;
        curUser.unreadMessages = 0;
      }
      setListofUsers([curUser, ...uTemp]);
      setDisplayUsers([curUser, ...uTemp]);

      //push message to main array
      let temp = listOfMessages;
      if(!temp[selected.userID]){
        temp[selected.userID] = [...displayMessages]
      }
      console.log('sel', selected)
      temp[selected.userID].push(msg);
      console.log(temp);
      setListofMessages(temp);

      //display new messages
      setDisplayMessages([...temp[selected.userID]]);

      //send msg to server to save to db
    }
  }

  return<>
    <ThemeProvider theme={darkModeState? lightThemes : darkThemes}>
      <Toast
        open={open}
        setOpen={setOpen}
        toastMsg={toastMsg}
        toastSeverity={toastSeverity}/>
      <CssBaseline/>
      <GlobalStyles
        styles={{
          body: {backgroundColor: darkModeState? lightThemes.palette.primary.light : darkThemes.palette.primary.light},
          '*::-webkit-scrollbar': {
            width: '0.5em'
          },
          '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: darkModeState? lightThemes.palette.secondary.scroll : darkThemes.palette.secondary.scroll,
            outline: darkModeState? lightThemes.palette.secondary.scroll : darkThemes.palette.secondary.scroll,
            borderRadius: '40px'
          }
        }}/>
      <Box sx={{
        backgroundColor: darkModeState? lightThemes.palette.primary.main : darkThemes.palette.primary.main,
        width: '100vw'
      }}>
        <Header darkModeState={darkModeState} setDarkModeState={setDarkModeState} isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn = {setIsUserLoggedIn}/>
      </Box>
      <Box sx={{
        paddingTop: '3.5rem',
        paddingInline: '1rem',
        position: 'relative',
        minWidth: 'calc(100vw - 2rem)',
        minHeight: 'calc(100vh - 3.5rem)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Loader 
          isLoading = {isLoading}
          darkModeState = {darkModeState}/>
        <Routes>
          <Route
            element = {
            <Login 
            setIsLoading = {setIsLoading} 
            setIsUserLoggedIn = {setIsUserLoggedIn} 
            setDarkModeState={setDarkModeState}/>
            }
            exact path='/login'/>
          <Route
            element = {<Register setIsLoading = {setIsLoading} darkModeState = {darkModeState}/>}
            exact path='/register'/>
          <Route
            element = {
            <Home 
            setIsLoading = {setIsLoading} 
            setDarkModeState={setDarkModeState}
            listOfUsers={displayUsers}
            displayMessages={displayMessages}
            loadMessages={loadMessages}
            searchUser={searchUser}
            setSearchUser={setSearchUser}
            selected={selected}
            addMessage={addMessage}
            message={message}
            setMessage={setMessage}
            clearSearch={clearSearch}
            />
            }
            exact path='/'/>
        </Routes>
      </Box>
    </ThemeProvider>
  </>
}

export default App;
