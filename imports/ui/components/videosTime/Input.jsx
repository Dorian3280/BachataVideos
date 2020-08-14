import React from 'react';
import styled from 'styled-components';

const MultiToolInput = (props) => {
   if (props.name === 'timeSpeed') {
      return <input type="number" min="0.5" max="3" step="0.1" {...props}></input>
   }
   if (props.name === 'timeRange') {
      return <input type="text" pattern="^[0-9]{2}:[0-9]{2}$" {...props}></input>
   }
   return <input></input>
 };

const InputStyled = styled(MultiToolInput)`
   width: 80px;
   border: 2px solid rgb(102, 102, 102);
   font-size: 1.5rem;
   padding: 5px 8px;
   margin: 0 5px;
   color: rgb(51, 51, 51);
   border-radius: 3px;
`;

export default InputStyled;