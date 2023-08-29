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

const lightThemes = createTheme({
  palette:{
    primary: {
      main: '#BFFFC7',
      contrastText: '#00CD19'         
    },
    secondary: {
      main: '#00CD19',
      contrastText: '#BFFFC7'
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
      contrastText: '#9400FF'
    },
    secondary: {
      main: '#9400FF',
      contrastText: '#0B0041'
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

  const navigate = useNavigate();

  useEffect(() => {
    if(sessionStorage.getItem('authToken') === null){
      setIsUserLoggedIn(false);
      navigate('/login')
    }else{
      setIsUserLoggedIn(true);
      setDarkModeState(sessionStorage.getItem('darkModeState') !== 'true')
    }
  }, []);

  return<>
    <ThemeProvider theme={darkModeState? lightThemes : darkThemes}>
      <Box sx={{
        backgroundColor: darkModeState? lightThemes.palette.primary.main : darkThemes.palette.primary.main,
        width: '100vw',
      }}>
        <Header darkModeState={darkModeState} setDarkModeState={setDarkModeState} isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn = {setIsUserLoggedIn}/>
      </Box>
      <Box sx={{
        paddingTop: '3.5rem',
        paddingInline: '1rem',
        position: 'relative',
        backgroundColor: darkModeState? lightThemes.palette.primary.light : darkThemes.palette.primary.light,
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
            element = {<Login setIsLoading = {setIsLoading} setIsUserLoggedIn = {setIsUserLoggedIn} setDarkModeState={setDarkModeState}/>}
            exact path='/login'/>
          <Route
            element = {<Register setIsLoading = {setIsLoading} darkModeState = {darkModeState}/>}
            exact path='/register'/>
          <Route
            element = {<Home setIsLoading = {setIsLoading} setDarkModeState={setDarkModeState}/>}
            exact path='/'/>
        </Routes>
      </Box>
    </ThemeProvider>
  </>
}

export default App;
