import React, { useState, useEffect, useCallback } from 'react';
import { capitalizeFirstLetter } from '/imports/ui/utils/functions';

import Background from '/imports/ui/components/Background';
import Container from '/imports/ui/components/Container';
import SalleContainer from '/imports/ui/components/SalleContainer';
import Video from '/imports/ui/components/Video';
import Title from '/imports/ui/components/Title';
import List from '/imports/ui/components/List';
import Img from '/imports/ui/components/Img';
import Button from '/imports/ui/components/Button';

const DanceVideos = (props) => {
    
    const level = props.match.params[0];

    const [ salles, setSalles ] = useState([]);
    const [ loop, setLoop ] = useState(false);
    const [ muted, setMuted ] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/?level=${level}`)
        .then(res => res.json())
        .then(data => {
            setSalles(Object.entries(hydrateSalleArray(data)));
        })
        .catch((err) => {
            console.log('erreur : ' + err);
        });
    }, []);
    
    const hydrateSalleArray = useCallback((data) => {
        return data.reduce((accu, url) => {
            const splitString = url.split('-');
            const salle = splitString[0];
          
            if(!accu[salle]) accu[salle] = [];
            accu[salle].push(url);
            return accu;
        }, {});
    }, []);

    const handleMuted = useCallback(() => {
        setMuted(!muted);
    }, [muted]);

    const handleLoop = useCallback(() => {
        setLoop(!loop);
    }, [loop]);

    return (
        <Background>
            <Container>
                <Button to="/"></Button>
                <Title level="2">{capitalizeFirstLetter(level)}</Title>
                <List justify={'center'}>
                    <Img format="40" onClick={handleMuted} name={`muted-${muted}`}></Img>
                    <Img format="40" onClick={handleLoop} name={`loop-${loop}`}></Img>
                </List>
                {salles.map((salle, i) => {
                    return (
                        <div key={i}>
                            <Title level="3">{capitalizeFirstLetter(salle[0])}</Title>
                            <SalleContainer>
                            {salle[1].map((url, i) => 
                                <Video
                                    level={level}
                                    url={url}
                                    key={i}
                                    loop={loop}
                                    muted={muted}
                                ></Video> )}
                            </SalleContainer>
                        </div>
                    )
                })}
            </Container>
        </Background>
    );
};

export default DanceVideos;