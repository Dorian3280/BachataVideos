import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

import Img from '/imports/ui/components/Img';
import TimeHandler from '/imports/ui/components/videosTime/TimeHandler';
import TimeSpeed from '/imports/ui/components/videosTime/TimeSpeed';
import TimeRange from '/imports/ui/components/videosTime/TimeRange';
import StartTime from '/imports/ui/components/videosTime/StartTime';
import EndTime from '/imports/ui/components/videosTime/EndTime';
import Input from '/imports/ui/components/videosTime/Input';
import Span from '/imports/ui/components/videosTime/Span';

const Video = (props) => {
    
    const [ startTime, setStartTime ] = useState(0);
    const [ endTime, setEndTime ] = useState(0);
    const [ playing, setPlaying ] = useState(false);
    const [ playbackRate, setPlaybackRate ] = useState(1);

    const HandleChangeStartTime = useCallback((event) => {
        setStartTime(timeToNumber(event.target.value));
    }, [startTime]);

    const HandleChangeEndTime = useCallback((event) => {
        setEndTime(timeToNumber(event.target.value))
    }, [endTime]);

    const HandleProgress = useCallback((time) => {
        if (startTime > time.playedSeconds) this.player.seekTo(startTime);
        if (endTime < time.playedSeconds) {
            if (props.loop) {
                this.player.seekTo(startTime);
            } else {
                setPlaying(false);
            }
        };
    }, [startTime, endTime, this.player, props.loop]);

    const handlePlay = useCallback(() => {
        setPlaying(true);
    }, [playing]);

    const handlePause = useCallback(() => {
        setPlaying(false);
    }, [playing]);

    const handleReady = useCallback(() => {
        setEndTime(this.player.getDuration());
    }, [this.player, endTime]);

    const handleSlower = useCallback(() => {
        newPlayBackRate = (playbackRate - 0.5) < 0.5 ? 0.5 : (playbackRate - 0.5);
        setPlaybackRate(newPlayBackRate);
    }, [playbackRate]);

    const handleFaster = useCallback(() => {
        newPlayBackRate = (playbackRate + 0.5) > 3 ? 3 : (playbackRate + 0.5);
        setPlaybackRate(newPlayBackRate);
    }, [playbackRate]);

    const HandleSpeed = useCallback((event) => {
        newPlayBackRate = parseFloat(event.target.value);
        setPlaybackRate(newPlayBackRate);
    }, [playbackRate]);

    const timeToNumber = useCallback((number) => {
        const minutesAndSeconds = number.split(':');
        return (parseInt(minutesAndSeconds[0])*60) + parseInt(minutesAndSeconds[1]);
    }, []);

    const numberToTime = useCallback((duration) => {
        return `${addZero(Math.floor(duration/60))}:${addZero(Math.round(duration%60))}`;
    }, []);

    const addZero = useCallback((number) => {
        return number > 9 ? number : `0${number}`;
    }, []);

    const ref = useCallback((player) => {
        this.player = player;
    }, [this.player]);

    const onKeyDown = useCallback((event) => {
        switch (event.keyCode) {
            case 37:
                // Gauche
                event.preventDefault();
                this.player.seekTo(this.player.getCurrentTime() - 5)
                break;
            case 38:
                // Haut
                event.preventDefault();
                handleFaster();
                break;
            case 39:
                // Droite
                event.preventDefault();
                this.player.seekTo(this.player.getCurrentTime() + 5)
                break;
            case 40:
                // Bas
                event.preventDefault();
                handleSlower()
                break;
            default:
                break;
        }
    }, [this.player, handleSlower, handleFaster]);
    return (
        <div className={props.className}>
            <ReactPlayer
                ref={ref}
                url={`videos/${props.level}/${props.url}`}
                width='300px'
                height='400px'
                controls={true}
                muted={props.muted}
                loop={props.loop}
                progressInterval={200}
                playbackRate={playbackRate}
                playing={playing}
                onPlay={handlePlay}
                onPause={handlePause}
                onReady={handleReady}
                onProgress={HandleProgress}
                onKeyDown={onKeyDown}
            />
            <TimeHandler>
                <TimeRange>
                    <StartTime>
                        <Input
                            name="timeRange"
                            onChange={HandleChangeStartTime}
                            value={numberToTime(startTime)}
                        ></Input>
                    </StartTime>
                    <Span>&#10132;</Span>
                    <EndTime>
                        <Input
                            name="timeRange"
                            onChange={HandleChangeEndTime}
                            value={numberToTime(endTime)}
                        ></Input>
                    </EndTime>
                </TimeRange>
                <TimeSpeed>
                    <Img format="20" onClick={handleSlower} name="slower"></Img>
                    <Input name="timeSpeed" value={playbackRate} onChange={HandleSpeed}></Input>
                    <Img format="30" onClick={handleFaster} name="faster"></Img>
                </TimeSpeed>
            </TimeHandler>
        </div>
    )
};

const StyledVideo = styled(Video)`
    margin: 20px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default StyledVideo;