import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '../css/App.css';

import Header from "./Header";
import UserList from "./users/UserList";
import UserCreate from "./users/UserCreate";
import UserEdit from "./users/UserEdit";
import UserDelete from "./users/UserDelete";

const App = () => {

  return (
    <div className="ui container">
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path='/' exact element={<UserList/>} />
            <Route path='/user/new' exact element={<UserCreate />} />
            <Route path='/user/edit/:id' exact element={<UserEdit />} />
            <Route path='/user/delete/:id' exact element={<UserDelete />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
