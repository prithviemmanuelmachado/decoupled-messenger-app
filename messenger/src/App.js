import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Containers/Login';
import Home from './Containers/Home';

function App() {
  return<>
    <Routes>
      <Route
        element = {<Login/>}
        exact path='/login'/>
      <Route
        element = {<Home/>}
        exact path='/'/>
    </Routes>
  </>
}

export default App;
