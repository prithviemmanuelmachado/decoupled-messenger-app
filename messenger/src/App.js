import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Containers/Login';
import Home from './Containers/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useState } from 'react';
import { alpha } from '@mui/system';

const lightThemes = createTheme({
  palette:{
    primary: {
      main: '#FFE2F8',
      contrastText: '#FF2EF5'           
    },
    secondary: {
      main: '#FF2EF5',
      contrastText: '#FFE2F8' 
    },
    success: {
      main: '#1FAEE0',
      contrastText: '#FFE2F8'
    },
    info: {
      main: '#ECC913',
      contrastText: '#FFE2F8'
    },
    error: {
      main: '#FB0443',
      contrastText: '#FFE2F8'
    }
  },
});
const darkThemes = createTheme({
  palette:{
    primary: {
      main: '#0B0041',
      contrastText: '#FF00FF'
    },
    secondary: {
      main: '#FF00FF',
      contrastText: '#0B0041'
    },
    success: {
      main: '#0B39F4',
      contrastText: '#0B0041'
    },
    info: {
      main: '#FF9600',
      contrastText: '#0B0041'
    },
    error: {
      main: '#FF000C',
      contrastText: '#0B0041'
    }
  },
});

function App() {
  const [darkModeState, setDarkModeState] = useState(true);
  return<>
    <ThemeProvider theme={darkModeState? lightThemes : darkThemes}>
      <Box sx={{
        position: 'relative',
        backgroundColor: darkModeState? lightThemes.palette.primary.main : darkThemes.palette.primary.main,
        width: '100vw',
        height: '100vh'
      }}>
        <Routes>
          <Route
            element = {<Login/>}
            exact path='/login'/>
          <Route
            element = {<Home darkModeState={darkModeState} setDarkModeState={setDarkModeState}/>}
            exact path='/'/>
        </Routes>
      </Box>
    </ThemeProvider>
  </>
}

export default App;
