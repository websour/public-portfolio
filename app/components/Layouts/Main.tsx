'use client'
import React, { ReactNode } from 'react';
import styled from 'styled-components'

const Container = styled.main``

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => <Container>{children}</Container>;
export default Main