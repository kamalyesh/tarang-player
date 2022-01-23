import React from 'react'

export function Footer() {
    return <footer>
        <p>
            We are using Node.js <span id="node-version"></span>,
            Chromium <span id="chrome-version"></span>,
            and Electron <span id="electron-version"></span>.
        </p>
    </footer>
}