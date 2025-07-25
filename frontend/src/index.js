import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/Home';
import Register from './pages/register';
import './style.css';
import Logout from './pages/Logout';
import { SessionPing } from './middleware/SessionPing';

export default function App() {
  return (
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Login />}/>
      <Route path="/login" element={<Login />}/>
      <Route element={<SessionPing/>}>
        <Route path="/register" element={<Register />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

