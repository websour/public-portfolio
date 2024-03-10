
'use client'
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: ${props => props.theme.space[10]};
  position: relative;
  z-index: 1;
  ${props => props.theme.breakpoint.sp`
    margin-top: ${(props: { theme: { space: any; }; }) => props.theme.space[0]};
  `}
`
const WorksInfoList = styled.ul`
  margin-top: ${props => props.theme.space[5]};
  display: flex;
  justify-content: space-between;
  ${props => props.theme.breakpoint.sp`
    flex-direction: column;
    margin-top: ${(props: { theme: { space: any; }; }) => props.theme.space[4]};
  `}
`
const WorksInfoListItem = styled.li`
  width: 30%;
  ${props => props.theme.breakpoint.sp`
    width: 100%;
    &:not(:first-of-type) {
      margin-top: ${(props: { theme: { space: any; }; }) => props.theme.space[2]};
    }
  `}
`
const WorksInfoCard = styled.div`
  display: inline-block;
  padding: ${props => props.theme.space[4]} ${props => props.theme.space[2]} ${props => props.theme.space[3]} ${props => props.theme.space[4]};
  cursor: pointer;
  width: 100%;
  overflow: hidden;
  text-decoration: none;
  border-color: ${props => props.theme.colors.white};
  box-shadow: 0 1px 2px 0 #c2c2c2;
  background: ${props => props.theme.colors.white};
  text-align: left;
  min-height: 120px;
  color: ${props => props.theme.colors.blackPrimary};
  border-radius: ${props => props.theme.borderRadius[1]};
  ${props => props.theme.breakpoint.sp`
    min-height: 72px;
  `}
`
const WorksInfoCardTitle = styled.div`
 font-weight: bold;
 ${props => props.theme.breakpoint.sp`
    font-size: ${(props: { theme: { fontSizes: any; }; }) => props.theme.fontSizes.small};
  `}
`
const WorksInfoCardText = styled.div`
 margin-top: ${props => props.theme.space[2]};
 ${props => props.theme.breakpoint.sp`
  margin-top: ${(props: { theme: { space: any; }; }) => props.theme.space[1]};
  font-size: ${(props: { theme: { fontSizes: any; }; }) => props.theme.fontSizes.xSmall};
  `}
`

const WorksInfoArray = [
  {
    title: "Domain contract management tool",
    description: "Markup, coding, module development, AB testing",
  },
  {
    title: "Rental server (control panel)",
    description: "Responsible for markup, coding, and CSS design during renewal.",
  },
  {
    title: "Corporate site, IR site",
    description: "We carry out everything from site construction to operation and maintenance.",
  },
];

const WorksContainer = (): JSX.Element => {

  return (
    <Container>
      <WorksInfoList>
        {WorksInfoArray.map((item, index): JSX.Element => (
          <WorksInfoListItem key={index}>
            <WorksInfoCard>
              <WorksInfoCardTitle>{item.title}</WorksInfoCardTitle>
              <WorksInfoCardText>{item.description}</WorksInfoCardText>
            </WorksInfoCard>
          </WorksInfoListItem>
        ))}
      </WorksInfoList>
    </Container>
  );
};

export default WorksContainer;
