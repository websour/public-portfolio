'use client'
import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
  font-size: ${props => props.theme.fontSizes.mediumLarge};
  font-weight: bold;
  color: ${props => props.theme.colors.blackPrimary};
  display: flex;
  align-items: center;
  img {
    margin-right: ${props => props.theme.space[2]};
  }
`
const HeaderContainer = styled.header`
  padding: ${props => props.theme.space[2]};
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  position: sticky;
  top: 0;
  background-color: ${props => props.theme.colors.backgroundColoropacity};
  z-index: 2;
  ${props => props.theme.breakpoint.sp`
      padding: ${(props: { theme: { space: any[]; }; }) => props.theme.space[0]} ${(props: { theme: { space: any[]; }; }) => props.theme.space[0]};
  `}
`
const Inner = styled.div`
  padding: ${props => props.theme.space[0]} ${props => props.theme.space[8]};
  display: flex;
  justify-content: space-between;
  ${props => props.theme.breakpoint.sp`
      padding: ${(props: { theme: { space: any[]; }; }) => props.theme.space[2]} ${(props: { theme: { space: any[]; }; }) => props.theme.space[8]};
  `}
`

const LoginHeader = (): JSX.Element => {
  return (
    <HeaderContainer as="header">
      <Inner>
        <Heading>
          <img src="/logo.png" width={36} height={36} alt="ロゴ" />
          PortfolioYS
        </Heading>
      </Inner>
    </HeaderContainer>
  );
}
export default LoginHeader