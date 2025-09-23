import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import UserListPage from './pages/UserListPage';
import CreateUserPage from './pages/CreateUserPage';
import ViewUserPage from './pages/ViewUserPage';
import EditUserPage  from './pages/EditUserPage';
import './index.css';
function App() {
  return (
    <Provider store={store}>
      <Router basename="/FullStack-Technical-test/">
        <Routes>
          <Route path="/" element={<UserListPage />} />
          <Route path="/user/create" element={<CreateUserPage />} />
          <Route path="/user/:id" element={<ViewUserPage />} />
          <Route path="/user/:id/edit" element={<EditUserPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
