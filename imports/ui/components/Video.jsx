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
    const [ endTime, setEndTime ] = useState(300);
    const [ playing, setPlaying ] = useState(false);
    const [ playbackRate, setPlaybackRate ] = useState(1);

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

    const verifyIntervalSpeed = useCallback((number) => {
        if (number > 3 ) return 3;
        if (number < 0.5 ) return 0.5;
        return number;
    }, []);

    const handleChangeStartTime = useCallback((event) => {
        setStartTime(timeToNumber(event.target.value));
    }, [startTime, timeToNumber]);

    const handleChangeEndTime = useCallback((event) => {
        setEndTime(timeToNumber(event.target.value))
    }, [endTime, timeToNumber]);

    const handleProgress = useCallback((time) => {
        if (startTime > time.playedSeconds) this.player.seekTo(startTime);
        if (endTime < time.playedSeconds) {
            if (props.loop) {
                this.player.seekTo(startTime);
            } else {
                setPlaying(false);
            }
        };
    }, [startTime, endTime, this.player, props.loop, playing]);

    const handlePlay = useCallback(() => {
        setPlaying(true);
    }, [playing]);

    const handlePause = useCallback(() => {
        setPlaying(false);
    }, [playing]);

    const handleSlower = useCallback(() => {
        setPlaybackRate(verifyIntervalSpeed(playbackRate - 0.5));
    }, [playbackRate, verifyIntervalSpeed]);

    const handleFaster = useCallback(() => {
        setPlaybackRate(verifyIntervalSpeed(playbackRate + 0.5));
    }, [playbackRate, verifyIntervalSpeed]);

    const handleSpeed = useCallback((event) => {
        setPlaybackRate(parseFloat(event.target.value));
    }, [playbackRate]);

    const ref = useCallback((player) => {
        this.player = player;
    }, [this.player]);

    const handleKeyDown = useCallback((event) => {
        switch (event.keyCode) {
            case 37:
                // Gauche
                event.preventDefault();
                this.player.seekTo(this.player.getCurrentTime() - 5);
                break;
            case 38:
                // Haut
                event.preventDefault();
                setPlaybackRate(2);
                break;
            case 39:
                // Droite
                event.preventDefault();
                this.player.seekTo(this.player.getCurrentTime() + 5);
                break;
            case 40:
                // Bas
                event.preventDefault();
                setPlaybackRate(0.5);
                break;
            case 97:
                // 1 (Pav num)
                event.preventDefault();
                setPlaybackRate(1);
                break;
            default:
                break;
        }
    }, [handleFaster, handleSlower, this.player]);
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
                onProgress={handleProgress}
                onKeyDown={handleKeyDown}
            />
            <TimeHandler>
                <TimeRange>
                    <StartTime>
                        <Input
                            name="timeRange"
                            onChange={handleChangeStartTime}
                            value={numberToTime(startTime)}
                        ></Input>
                    </StartTime>
                    <Span>&#10132;</Span>
                    <EndTime>
                        <Input
                            name="timeRange"
                            onChange={handleChangeEndTime}
                            value={numberToTime(endTime)}
                        ></Input>
                    </EndTime>
                </TimeRange>
                <TimeSpeed>
                    <Img format="20" onClick={handleSlower} name="slower"></Img>
                    <Input name="timeSpeed" value={playbackRate} onChange={handleSpeed}></Input>
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