import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom'
import { Tarang } from 'tarang';
import 'tarang/dist/index.css';

export function Player() {
    // const location = useLocation()
    // console.log(location)
    const { nowPlaying } = useSelector(state => state.playlistSlice)
    const [playing, update] = useState(nowPlaying.url)
    useEffect(() => {
        update("")
        setTimeout(() => {
            update(nowPlaying?.url)
        }, 100);
    }, [nowPlaying])
    return (
        <>
            <p>{JSON.stringify(nowPlaying)}</p>
            {
                playing &&
                <Tarang.Line
                    width={512}
                    height={200}
                    scale={1}
                    controls={true}
                    muted={false}
                    volume={0.8}
                    audioUrl={playing}
                    coverArtUrl={"https://tarang.surge.sh/images/example-cover.png"}
                />
            }
        </>
    )
}