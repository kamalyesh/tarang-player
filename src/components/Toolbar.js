import React from 'react'

export function Toolbar({ playlist }) {
    return (<ul>
        <li>
            <lable for="playlist-control">
                <input type="checkbox" name="playlist-control" id="playlist-control"></input>
            </lable>
        </li>
    </ul>)
}