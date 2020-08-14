import React from 'react';

import Background from '/imports/ui/components/Background';
import Container from '/imports/ui/components/Container';
import Title from '/imports/ui/components/Title';
import List from '/imports/ui/components/List';
import Li from '/imports/ui/components/Li';
import Paragraph from '/imports/ui/components/Paragraph';


const Home = () => {

    const levelsOne = ['debutant', 'intermediaire', 'avance'];
    const levelsTwo = ['complet', 'entrainement'];

    return (
        <Background>
            <Container>
                <Title>Passes de Bachata</Title>
                <Paragraph>Selectionnez le niveau des passes</Paragraph>
                <List justify={'space-evenly'}>
                    {levelsOne.map((level, i) => <Li to={level} level={level} key={i}></Li>)}
                </List>
                <Paragraph>Pour apprendre un enchainement</Paragraph>
                <List justify={'space-evenly'}>
                    {levelsTwo.map((chain, i) => <Li to={chain} level={chain} key={i}></Li>)}
                </List>
            </Container>
        </Background>
    )
};

export default Home;