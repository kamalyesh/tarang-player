import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

// console.log("event enabled: ", Boolean(ipc))
// if(ipc) setTimeout(() => {
//     console.log("sending event")
//     ipc.send("SCAN_DIR", "file:////home/kamalyesh/")
//     console.log("event sent")
// }, 5 * 1000);

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));