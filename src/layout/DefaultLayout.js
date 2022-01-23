import React from 'react';
import { useLocation } from 'react-router-dom'

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Playlist } from "../components/playlist";

export function DefaultLayout({ children }) {
    const location = useLocation()
    console.log(location)
    
    return (
        <div className="App">
            <Header />
            {location.pathname == "/" ? <Playlist /> : null}
            {children}
            <Footer />
        </div>
    );
}