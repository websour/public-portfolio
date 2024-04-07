'use client'
import React, { ReactNode } from 'react';
import styled from 'styled-components'

const Container = styled.main`
    min-height: 100vh;
`

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => <Container>{children}</Container>;
export default Main