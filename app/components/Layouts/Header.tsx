import React from 'react';
import styled from 'styled-components';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Heading = styled.h1`
  font-size: ${props => props.theme.fontSizes.mediumLarge};
  font-weight: bold;
  color: ${props => props.theme.colors.blackPrimary};
  display: flex;
  align-items: center;
  img {
    margin-right: ${props => props.theme.space[2]};
    ${props => props.theme.breakpoint.sp`
      width: 36px;
    `}
  }
`
const List = styled.ul`
  display: flex;
  align-items: center;
  ${props => props.theme.breakpoint.sp`
    display: none;
  `}
`
const ListItem = styled.li`
  font-size: ${props => props.theme.fontSizes.medium};
  font-weight: bold;
  margin-left: ${props => props.theme.space[3]};
  color: ${props => props.theme.colors.blackPrimary};
`
const HeaderContainer = styled.header`
  padding: ${props => props.theme.space[2]};
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  position: sticky;
  top: 0;
  background-color: ${props => props.theme.colors.backgroundColoropacity};
  z-index: 2;
`
const Inner = styled.div`
  padding: ${props => props.theme.space[0]} ${props => props.theme.space[8]};
  display: flex;
  justify-content: space-between;
  ${props => props.theme.breakpoint.sp`
      padding: ${(props: { theme: { space: any[]; }; }) => props.theme.space[0]} ${(props: { theme: { space: any[]; }; }) => props.theme.space[0]};
  `}
`

const Header = () => {
  return (
    <HeaderContainer as="header">
      <Inner>
        <Heading>
          <img src="/logo.png" width={36} height={36} alt="ロゴ" />
          PortfolioYS
        </Heading>
        <List>
          <ListItem><AnchorLink href="#about" aria-label="Aboutへのページ内リンク">About</AnchorLink></ListItem>
          <ListItem><AnchorLink href="#works" aria-label="Worksへのページ内リンク">Works</AnchorLink></ListItem>
          <ListItem><AnchorLink href="#skills" aria-label="Skillsへのページ内リンク">Skills</AnchorLink></ListItem>
          <ListItem><AnchorLink href="#contact" aria-label="Contactへのページ内リンク">Contact</AnchorLink></ListItem>
        </List>
      </Inner>
    </HeaderContainer>
  );
}
export default Header