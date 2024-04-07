'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google'

import Header from "./Header";
import LoginHeader from "./LoginHeader";
import Main from "./Main";
import Footer from "./Footer";

import { ThemeProvider } from 'styled-components';
import { themes } from '../../themes';
import '../../globals.css';
import StyledComponentsRegistry from '../../registry'

const inter = Inter({ subsets: ['latin'] })

const AppLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const pathname = usePathname();
  const getHeader = () => {
    switch (pathname) {
      case '/login':
        return <LoginHeader />; 
      default:
        return <Header />;
    }
  };
  const getFooter = () => pathname !== '/login' && <Footer />;

  return (
    <html lang="ja">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ThemeProvider theme={themes}>
            {getHeader()}
            <Main>{children}</Main>
            {getFooter()}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
export default AppLayout;