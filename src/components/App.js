import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { fetchUsers } from '../actions';

import Header from "./Header";
import UserList from "./users/UserList";
import UserCreate from "./users/UserCreate";
import UserEdit from "./users/UserEdit";
import UserDelete from "./users/UserDelete";

const App = () => {

  const dispatch = useDispatch();
// Fetching users from api and saving state of store:
  const dispatchFetchUsers = useCallback(() => dispatch(fetchUsers()), [dispatch]);
  useEffect(() => {
    dispatchFetchUsers();
  }, [dispatchFetchUsers])

  // set color theme for the app:
  const theme = createTheme({
    palette: {
      primary: {
        light: '#6d91aa',
        main: '#395b71',
        dark: '#2b485b',
        contrastText: '#fff',
      },
      secondary: {
        light: '#f7da52',
        main: '#f4c349',
        dark: '#e98732',
        contrastText: '#000',
      },
    },
  });

  return (

      <Router>
        <div>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <UserList />
          <Routes>
            <Route path='/' exact element={<UserList/>} />
            <Route path='/user/new' exact element={<UserCreate />} />
            <Route path='/user/edit/:id' exact element={<UserEdit />} />
            <Route path='/user/delete/:id' exact element={<UserDelete />} />
          </Routes>
        </ThemeProvider>
        </div>
      </Router>
  
  );
}

export default App;
