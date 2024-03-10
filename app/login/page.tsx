'use client'
import React, { useState, useEffect } from 'react';

import LoginForm from '../components/Pages/LoginForm';
import Loading from '../components/Loading';
import styled from "styled-components";
const LoginFormContainer = styled.div`
    width: 100%;
    display: flex;
    height: calc(100vh - 50px);
    align-items: center;
    justify-content: center;
    form {
      margin-top: -200px;
    }
    ${props => props.theme.breakpoint.sp`
    padding: ${(props: { theme: { space: any[]; }; }) => props.theme.space[10]} ${(props: { theme: { space: any[]; }; }) => props.theme.space[8]};
    `}
`;
const NowLoadingContainer = styled.div`
  margin-top: -100px;
  width: 100%;
  display: flex;
  height: calc(100vh - 50px);
  align-items: center;
  justify-content: center;
  flex-direction: column;
  p {
    font-size: ${props => props.theme.fontSizes.medium};
    color: ${props => props.theme.colors.lightBluePrimary};
    margin-top: ${props => props.theme.space[1]};
    margin-left: ${props => props.theme.space[4]};
  }
`
const ProtectedPage = (): JSX.Element => {
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 400);
  }, []);
  return (
    <>
    {showContent ? (
    <LoginFormContainer>
      <LoginForm />
    </LoginFormContainer>
    ) : (
      <NowLoadingContainer>
        <Loading/>
        <p>Now loading...</p>
      </NowLoadingContainer>
    )}
    </>
  );
};
export default ProtectedPage;
