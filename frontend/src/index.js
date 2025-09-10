import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import './style.css';
import Logout from './pages/Logout';
import { SessionPing } from './middleware/SessionPing';
import Login from './pages/Login';
import Ws from './middleware/Ws';
import { registerServiceWorker } from './middleware/serviceWorkerRegistration';
import { subscribeUserToPush } from './middleware/pushSubscription';

const publicVapidKey = process.env.VAPID_PUBLIC_KEY

export default function App() {
  // TO DO : fix subscribeUserToPush function, get it out of useEffect, mind the service worker
  useEffect(() => {
    const setupPush = async () => {
      const reg = await registerServiceWorker();
      await subscribeUserToPush(reg, publicVapidKey)
    }
    setupPush();
  }, []);
  return (
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Login />}/>
      <Route path="/ws" element={<Ws />}/>
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

