import React from 'react';
import styled from 'styled-components';

const CustomImg = (props) => {
    return <img {...props} src={`assets/images/${props.name}.png`} />
};

const StyledImg = styled(CustomImg)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: ${({format}) => format}px;
    height: ${({format}) => format}px;
    margin: 0 10px;
`;

export default StyledImg;