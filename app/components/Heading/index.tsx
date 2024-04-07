import React from 'react';
import styled from 'styled-components'

const HeadingComponent = styled.h2`
  font-size: ${props => props.theme.fontSizes.xxLarge};
  font-weight: bold;
  color: ${props => props.theme.colors.blackPrimary};
  line-height: 1.2;
  ${props => props.theme.breakpoint.sp`
    font-size: ${(props: { theme: { fontSizes: any; }; }) => props.theme.fontSizes.xLarge};
  `}
`

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
};

const Heading: React.FC<HeadingProps> = ({ children, className }): JSX.Element => {
  return (
    <HeadingComponent className={className}>
      {children}
    </HeadingComponent>
  )
}
export default Heading