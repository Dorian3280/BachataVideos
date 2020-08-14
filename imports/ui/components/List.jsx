import React from 'react';
import styled from 'styled-components';

const StyledNav = styled.nav``;

const StyledList = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: ${({justify}) => justify};
`;

const List = ({children, justify}) =>  (
    <StyledNav>
        <StyledList justify={justify}>{children}</StyledList>
    </StyledNav>
);

export default List;