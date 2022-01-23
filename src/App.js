// import logo from './logo.svg';
// import './App.css';
// import { ipcRenderer } from 'electron/renderer';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layout/DefaultLayout';
import { About } from './pages/about';
import { Player } from './pages/player';
import { Settings } from './pages/settings';


function App() {
    return (
        <BrowserRouter>
            <App.Layout>
                <Routes>
                    <Route path="/" element={<Player />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="about" element={<About />} />
                </Routes>
            </App.Layout>
        </BrowserRouter>
    )
}
App.Layout = DefaultLayout

export default App;