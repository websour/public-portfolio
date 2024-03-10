'use client'
import React from 'react';
import styled from 'styled-components'

const FooterContainer = styled.footer`
  padding: ${props => props.theme.space[4]} ${props => props.theme.space[10]};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333;
  color: #fff;
`
const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2024 PortfolioYS</p>
    </FooterContainer>
  );
}
export default Footer