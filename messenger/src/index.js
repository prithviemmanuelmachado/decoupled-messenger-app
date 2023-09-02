import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

//so that rerender does not affect master lists

  // listOfUsers data type
  // [{ 
  //    name: <user full name>,
  //    unreadMessages: <number of unread messages>,
  //    userID: <userID>
  // }]
  let listOfUsers = [];
  
  // listOfMessages data type
  // {<userID>: [{ 
  //    body: <
  //       text if normal message OR
  //       if attachment {url: <url to s3>, type: <type of attachment>}
  //    >,
  //    to: <null if i sent the message OR userID if someone else sent message>,
  //    dateTime: <dateTime of message in utf format>
  // }]}
  let listOfMessages = {};
  
  const setListOfUsers = (lou) => {
    console.log('lou: ', lou);
    listOfUsers = [...lou];
    console.log('listOfUser: ', listOfUsers);
  }

  const getListOfUsers = () => {
    return [...listOfUsers]
  }

ReactDOM.render(
  <BrowserRouter>
    <App getListOfUsers={getListOfUsers} listOfMessages={listOfMessages} setListOfUsers={setListOfUsers}/>
  </BrowserRouter>,
  document.getElementById('root')
);