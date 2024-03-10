import React from 'react';
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0%{
    transform: rotate(0deg);
    opacity: 1;
  }
  65%{
    transform: rotate(180deg);
    opacity: 0.8;
  }
  100%{
    transform: rotate(360deg);
    opacity: 1;
  }
`;
const LoadingContainer = styled.div`
  border: 12px solid ${props => props.theme.colors.lightBlueSecondary};
  border-radius: 50%;
  border-top: 12px solid ${props => props.theme.colors.lightBluePrimary};
  width: 100px;
  height: 100px;
  animation: ${spin} 1s linear infinite;
`;

const Loading: React.FC = (): JSX.Element => { return <LoadingContainer/> }
export default Loading