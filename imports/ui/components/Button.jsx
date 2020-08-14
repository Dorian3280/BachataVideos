import React from 'react';
import styled from 'styled-components';

import { Link } from "react-router-dom";

const Button = ( {className, to} ) => {
    if (to) {
        return <Link className={className} to={to}>Retour</Link>
    }
}

const StyledButton = styled(Button)`
    display: block;
    width: 150px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #000;
    position: fixed;
    top: 10px;
    left: 10px;
    text-align: center;
    background-color: rgb(255, 123, 0);
`;

export default StyledButton;