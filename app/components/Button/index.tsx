import React from 'react';
import styled from 'styled-components'

const ButtonComponent = styled.button`
  width: 148px;
  height: 48px;
  border-radius: ${props => props.theme.borderRadius[1]};
  background-color: ${props => props.theme.colors.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.medium};
  font-weight: bold;
  cursor: pointer;
`

type ButtonProps = {
  as: string;
  disabled: boolean;
  onClick: () => Promise<void>;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ as, disabled, onClick, children }): JSX.Element => {
  return (
    <ButtonComponent as={as} disabled={disabled} onClick={onClick}>
      {children}
    </ButtonComponent>
  )
}
export default Button