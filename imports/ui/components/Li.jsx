import React from 'react';
import styled from 'styled-components';

import { capitalizeFirstLetter } from '/imports/ui/utils/functions';

import { Link } from "react-router-dom";

const CustomLi = ({className, children, level, to}) => {
    if (to) {
        return <Link className={className} to={level}>{capitalizeFirstLetter(level)}</Link>
    }
    return <li className={className}>{children}</li>
};

const StyledLi = styled(CustomLi)`
    width: 300px;
    height: 120px;
    background-color: rgb(214, 139, 0);
    box-shadow: 0 0 px black;
    transition: 0.25s;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default StyledLi;