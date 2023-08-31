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
import { logout } from './Components/server';
import { CssBaseline, GlobalStyles } from '@mui/material';

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
  const [listOfUsers, setListofUsers] = useState([
    {
      name: 'Prithvi E Machado',
      unreadMessages: 10,
      userID: 'dafeafdsuifauihfsa'
    },{
      name: 'Prit not me',
      unreadMessages: 7,
      userID: '1111111111'
    }
  ]);
  const [listOfMessages, setListofMessages] = useState({
    'dafeafdsuifauihfsa': [
      { body: 'Prithvi E first ', to: 'dafeafdsuifauihfsa', dateTime: new Date('2023-08-29T08:09:30.970+00:00')},
      { body: 'Prithvi E sec from me', to: null, dateTime: new Date('2023-08-29T08:09:30.970+00:00')},
      { body: 'Prithvi E third ', to: 'dafeafdsuifauihfsa', dateTime: new Date('2023-08-29T08:09:30.970+00:00') },
      { body: 'Prithvi E fourth from me', to: null, dateTime: new Date('2023-08-29T08:09:30.970+00:00')},
      { body: 'Prithvi E fifth ', to: 'dafeafdsuifauihfsa', dateTime: new Date('2023-08-29T08:09:30.970+00:00') },
      { body: 'Prithvi E first ', to: 'dafeafdsuifauihfsa', dateTime: new Date('2023-08-29T08:09:30.970+00:00')},
      { body: 'Prithvi E sec from me', to: null, dateTime: new Date('2023-08-29T08:09:30.970+00:00')},
      { body: 'Prithvi E third ', to: 'dafeafdsuifauihfsa', dateTime: new Date('2023-08-29T08:09:30.970+00:00') },
      { body: 'Prithvi E fourth from me', to: null, dateTime: new Date('2023-08-29T08:09:30.970+00:00')},
      { body: 'Prithvi E fifth from me', to: null , dateTime: new Date('2023-08-29T08:09:30.970+00:00')},
      { body: 'Prithvi E first ', to: 'dafeafdsuifauihfsa', dateTime: new Date('2023-08-29T08:09:30.970+00:00')},
      { body: 'Prithvi E sec from me', to: null, dateTime: new Date('2023-08-29T08:09:30.970+00:00')},
      { body: 'dafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsadafeafdsuifauihfsa', 
      to: null, dateTime: new Date('2023-08-29T08:09:30.970+00:00') },
      { body: 'Prithvi E fourth from me', to: null, dateTime: new Date('2023-08-29T08:09:30.970+00:00')},
      { body: 'Prithvi E fifth ', to: 'dafeafdsuifauihfsa', dateTime: new Date('2023-08-29T08:09:30.970+00:00') },
      { body: {
        url: '',
        type: 'image/png'
      }, to: 'dafeafdsuifauihfsa', dateTime: new Date('2023-08-29T08:09:30.970+00:00') },
      { body: {
        url: '',
        type: 'application/png'
      }, to: null, dateTime: new Date('2023-08-29T08:09:30.970+00:00') },
      { body: {
        url: '',
        type: 'application/png'
      }, to: 'dafeafdsuifauihfsa', dateTime: new Date('2023-08-29T08:09:30.970+00:00') },
      { body: {
        url: '',
        type: 'image/png'
      }, to: null, dateTime: new Date('2023-08-29T08:09:30.970+00:00') }
    ],
    '1111111111': [
      { body: 'Prit first from me', to: null, dateTime: new Date('2023-08-29T08:09:30.970+00:00')},
      { body: 'Prit sec ', to: '1111111111', dateTime: new Date('2023-08-29T08:09:30.970+00:00')},
      { body: 'Prit third ', to: '1111111111' , dateTime: new Date('2023-08-29T08:09:30.970+00:00')},
      { body: 'Prit fourth from me', to: null, dateTime: new Date('2023-08-29T08:09:30.970+00:00')},
      { body: 'Prit fifth from me', to: null , dateTime: new Date('2023-08-29T08:09:30.970+00:00')}
    ]
  });
  const [displayMessages, setDisplayMessages] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [selected, setSelected] = useState('');

  const loadMessages = (userID) => {
    setSelected(userID);
    const users = listOfUsers;

    //update unread message count
    users.forEach((ele, index) => {
      if(ele.userID === userID){
        ele.unreadMessages = 0;
      }
    });

    setListofUsers(users);
    setDisplayMessages(listOfMessages[userID]);
  }
  const navigate = useNavigate();

  //executed on load of page
  useEffect(() => {
    //listener to execute logout function on close of tab
    window.addEventListener('beforeunload', () => {
      // logout(JSON.stringify({
      //     url: sessionStorage.getItem('sessionUrl')
      // }));
      setIsUserLoggedIn(false);
    });

    //check auth
    setDisplayUsers(listOfUsers);
    if(sessionStorage.getItem('authToken') === null){
      setIsUserLoggedIn(false);
      //navigate('/login');
    }else{
      //setDisplayUsers(listOfUsers);
      setIsUserLoggedIn(true);
      setDarkModeState(sessionStorage.getItem('darkModeState') === 'true')
    }
  }, []);

  //local user serach
  useEffect(() => {
    const filtered = listOfUsers.filter((ele) => {
      return ele.name.toLowerCase().includes(searchUser.toLowerCase());
    })
    setDisplayUsers(filtered);
  },[searchUser]);

  useEffect(() => {
    //auto scroll to bottom of chat
    var messageBox = document.getElementById('messageBox');
    messageBox.scrollTop = messageBox.scrollHeight;
  }, [displayMessages])

  const addMessage = () => {
    if(selected !== ''){
      const msg = { body: message, to: selected, dateTime: new Date() };

      //push message to main array
      let temp = listOfMessages;
      temp[selected].push(msg);
      setListofMessages(temp);

      //move new user to top
      let uTemp = [...listOfUsers];
      let curUser = {};
      uTemp.forEach((ele, index) => {
        if(ele.userID === selected){
          curUser = ele;
          uTemp.splice(index, 1);
        }
      })
      setDisplayUsers([curUser, ...uTemp]);

      //display new messages
      setDisplayMessages([...temp[selected]]);

      //send msg to server to save to db
    }
  }

  return<>
    <ThemeProvider theme={darkModeState? lightThemes : darkThemes}>
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
        //backgroundColor: darkModeState? lightThemes.palette.primary.light : darkThemes.palette.primary.light,
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
            />
            }
            exact path='/'/>
        </Routes>
      </Box>
    </ThemeProvider>
  </>
}

export default App;
