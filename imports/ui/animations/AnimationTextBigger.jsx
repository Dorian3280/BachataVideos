import styled from 'styled-components';

const AnimationShadow = styled.span`
    @keyframes bigger {
        0% {
          box-shadow: 0 0 0 black;
        }
        100% {
          box-shadow: 2px 2px 0 black;
        }
    }
`;

export default AnimationShadow;