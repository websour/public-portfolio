import React from 'react';
import styled from 'styled-components'

const Text = styled.p`
  font-size: ${props => props.theme.fontSizes.mediumLarge};
  line-height: 2;
  width: 820px;
  margin-inline: auto;
  color: ${props => props.theme.colors.blackPrimary};
  ${props => props.theme.breakpoint.sp`
    width: 100%;
    font-size: ${(props: { theme: { fontSizes: any; }; }) => props.theme.fontSizes.medium};
  `}
`

type TextProps = {
  children: React.ReactNode;
  className?: string;
};

const Description: React.FC<TextProps> = ({ children, className }): JSX.Element => {
  return (
    <Text className={className}>
      {children}
    </Text>
  )
}
export default Description
