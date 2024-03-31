'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode, JwtPayload } from 'jwt-decode';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJs } from "@fortawesome/free-brands-svg-icons"
import { faAngular } from "@fortawesome/free-brands-svg-icons"
import { faReact } from "@fortawesome/free-brands-svg-icons"
import { faVuejs } from "@fortawesome/free-brands-svg-icons"
import { faWordpress } from "@fortawesome/free-brands-svg-icons"
import { faHtml5 } from "@fortawesome/free-brands-svg-icons"
import { faCss3Alt } from "@fortawesome/free-brands-svg-icons"
import { faPhp } from "@fortawesome/free-brands-svg-icons"

import HeroCanvas from "./components/Pages/Home/HeroCanvas/"
import WorksCanvas from "./components/Pages/Home/WorksCanvas"
import WorksContainer from "./components/Pages/Home/WorksContainer"
import SkillsChart from "./components/Pages/Home/SkillsChart"
import SupportChat from "./components/Pages/Home/SupportChat"
import ContactForm from "./components/Pages/Home/ContactForm/"
import ContactCanvas from "./components/Pages/Home/ContactCanvas"
import Heading from './components/Heading';
import Description from './components/Description';
import Footer from "./components/Layouts/Footer";
import Loading from './components/Loading';

import styled from "styled-components";
const StyledDescription = styled(Description)``;
const StyledContactCanvas = styled(ContactCanvas)``;
const StyledContactForm = styled(ContactForm)``;
const SectionInner = styled.div`
  padding-top:${props => props.theme.space[15]};
  padding-bottom:${props => props.theme.space[20]};
  margin-inline: auto;
  max-width: 1200px;
  ${StyledDescription} {
    margin-top: ${props => props.theme.space[1]};
  }
  ${props => props.theme.breakpoint.sp`
      padding: ${(props: { theme: { space: any[]; }; }) => props.theme.space[8]} ${(props: { theme: { space: any[]; }; }) => props.theme.space[8]};
  `}
`
const SectionHero = styled.section`
  background-color: ${props => props.theme.colors.lightBluePrimary};
  min-height: 420px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${props => props.theme.breakpoint.sp`
    min-height: auto;
  `}
  ${SectionInner} {
    position: relative;
    ${StyledDescription} {
      position: absolute;
      color: ${props => props.theme.colors.white};
      text-align: center;
      bottom: 120px;
      left: 50%;
      translate: -50%;
      ${props => props.theme.breakpoint.sp`
        position: initial;
        translate: 0;
        line-height: 1.5;
      `}
    }
    ${props => props.theme.breakpoint.sp`
      width: 100%;
      padding: ${(props: { theme: { space: any[]; }; }) => props.theme.space[8]} ${(props: { theme: { space: any[]; }; }) => props.theme.space[0]};
    `}
    canvas {
      ${props => props.theme.breakpoint.sp`
        width: 100%;
      `}
    }
  }
`
const SectionInfo = styled.section`
  width: 100%;
  margin-inline:auto;
  padding: 0;
  text-align: center;
  background-image: radial-gradient(${props => props.theme.colors.lightGray} 1px, transparent 1px), radial-gradient(${props => props.theme.colors.lightGray} 1px, transparent 1px);
  background-position: 0 0, 25px 25px;
  background-size: 50px 50px;
  min-height: 420px;
`
const SectionWorks = styled.section`
  background-color: rgba(238, 238, 238, 100%);
  width: 100%;
  background-image: url('/grid2.png');
  background-position: center;
  position: relative;
  text-align: center;
  min-height: 420px;
  canvas {
    ${props => props.theme.breakpoint.sp`
      width: 100%;
    `}
  }
`
const SectionSkills = styled.section`
  width: 100%;
  margin-inline:auto;
  padding: 0;
  text-align: center;
  background-image: radial-gradient(${props => props.theme.colors.lightGray} 1px, transparent 1px), radial-gradient(${props => props.theme.colors.lightGray} 1px, transparent 1px);
  background-position: 0 0, 25px 25px;
  background-size: 50px 50px;
  width: 100%;
`
const SkillsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: flex-start;
  margin-top: ${props => props.theme.space[10]};
  align-items: center;
  ${props => props.theme.breakpoint.sp`
    flex-direction: column;
    margin-top: ${(props: { theme: { space: any; }; }) => props.theme.space[4]};
  `}
`
const SkillsCardList = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 560px;
  margin-left: ${props => props.theme.space[20]};
  flex-wrap: wrap;
  ${props => props.theme.breakpoint.sp`
    width: 100%;
    margin-left: auto;
    flex-wrap: wrap;
  `}
`
const SkillsCardListItem = styled.li``
const SkillsCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border: solid 1px ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius[1]};
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.space[5]};
  font-size: ${props => props.theme.fontSizes.icon};
  color: ${props => props.theme.colors.lightGray};
  ${props => props.theme.breakpoint.sp`
    width: 72px;
    height: 72px;
  `}
  svg {
      color: inherit;
      ${props => props.theme.breakpoint.sp`
        width: 52px;
        height: 52px;
      `}
  }
  &:hover,
  &.is-active {
    cursor: pointer;
    box-shadow: 0 4px 4px ${props => props.theme.colors.skillsCardBoxShadow};
    border-width: 2px;
    &.React {
      border-color: ${props => props.theme.colors.skillsReact};
      color: ${props => props.theme.colors.skillsReact};
    }
    &.Angular {
      border-color: ${props => props.theme.colors.skillsAngular};
      color: ${props => props.theme.colors.skillsAngular};
    }
    &.Vuejs {
      border-color: ${props => props.theme.colors.skillsVuejs};
      color: ${props => props.theme.colors.skillsVuejs};
    }
    &.Wordpress {
      border-color: ${props => props.theme.colors.skillsWordpress};
      color: ${props => props.theme.colors.skillsWordpress};
    }
    &.Html5 {
      border-color: ${props => props.theme.colors.skillsHtml5};
      color: ${props => props.theme.colors.skillsHtml5};
    }
    &.Css3Alt {
      border-color: ${props => props.theme.colors.skillsCss3Alt};
      color: ${props => props.theme.colors.skillsCss3Alt};
    }
    &.Js {
      border-color: ${props => props.theme.colors.skillsJs};
      color: ${props => props.theme.colors.skillsJs};
    }
    &.PHP {
      border-color: ${props => props.theme.colors.skillsPHP};
      color: ${props => props.theme.colors.skillsPHP};
    }
  }
`
const SkillsChartWrap = styled.div`
  canvas {
    ${props => props.theme.breakpoint.sp`
      width: 100%;
    `}
  }
`
const SupportChatButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 20px;
  border: none;
  color: ${props => props.theme.colors.white};
  box-shadow: 0 4px 8px ${props => props.theme.colors.boxShadow};
  background-color: ${props => props.theme.colors.lightBluePrimary};
  border-radius: 50%;
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSizes.xxLarge};
  font-weight: bold;
  cursor: pointer;
  z-index: 1;
  &:hover {
    opacity: .7;
  }
`
const SupportChatPopup = styled.div`
  position: fixed;
  bottom: 120px;
  right: 20px;
  z-index: 2;
`
const SectionContact = styled.section`
  background-color: ${props => props.theme.colors.offWhite};
  width: 100%;
  background-image: url('/grid2.png');
  background-position: center;
  position: relative;
  text-align: center;
  ${props => props.theme.breakpoint.sp`
      overflow: hidden;
  `}
  canvas {
    ${props => props.theme.breakpoint.sp`
      top: 140px !important;
      left: 180px !important;
    `}
  }
`
const ContactFormComponent = styled.div`
  position: relative;
  ${StyledContactCanvas} {
    position: absolute;
    top: 200px;
    left: 840px;
    z-index: 0;
  }
  ${StyledContactForm} {
    position: relative;
    ${props => props.theme.breakpoint.sp`
      width: 100%;
    `}
  }
`
const NowLoadingContainer = styled.div`
  margin-top: -100px;
  width: 100%;
  display: flex;
  height: calc(100vh - 50px);
  align-items: center;
  justify-content: center;
  flex-direction: column;
  p {
    font-size: ${props => props.theme.fontSizes.medium};
    color: ${props => props.theme.colors.lightBluePrimary};
    margin-top: ${props => props.theme.space[1]};
    margin-left: ${props => props.theme.space[4]};
  }
`

const Home = (): JSX.Element => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeData, setActiveData] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        if (decodedToken.exp && Date.now() < decodedToken.exp * 1000) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem('token');
          router.push('/login');
        }
      } catch (error) {
        localStorage.removeItem('token');
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, []);

  const [skills] = useState([
    { id: 1, title: 'React', icon: faReact },
    { id: 2, title: 'Angular', icon: faAngular },
    { id: 3, title: 'Vuejs', icon: faVuejs },
    { id: 4, title: 'Wordpress', icon: faWordpress },
    { id: 5, title: 'Html5', icon: faHtml5 },
    { id: 6, title: 'Css3Alt', icon: faCss3Alt },
    { id: 7, title: 'Js', icon: faJs },
    { id: 8, title: 'PHP', icon: faPhp },
  ]);

  const togglePopup = ():void => {
    setShowPopup(!showPopup);
  };
  
  return (
    <>
    {isLoggedIn ? (
      <>
      <SectionHero as="section">
        <SectionInner as="div">
          <HeroCanvas width={1200} height={300}/>
          <StyledDescription>Crafting Accessible and User-Friendly Web Experiences</StyledDescription>
        </SectionInner>
      </SectionHero>
      <SectionInfo as="section" id="about">
        <SectionInner as="div">
          <Heading>About</Heading>
          <StyledDescription>An overview of my background and philosophy.As a Front-End Developer, I engage in the design and operation of websites using HTML, CSS, JavaScript, and PHP. I focus on accessibility and usability, applying my knowledge in UI/UX design. I also participate in projects using the latest JavaScript frameworks, aiming to develop sites and apps with user-centric designs and high accessibility.</StyledDescription>
        </SectionInner>
      </SectionInfo>
      <SectionWorks as="section" id="works">
        <SectionInner>
          <Heading>Works</Heading>
          <StyledDescription>Displaying projects and achievements.</StyledDescription>
          <WorksCanvas width={1200} height={400}/>
          <WorksContainer />
        </SectionInner>
      </SectionWorks>
      <SectionSkills as="section" id="skills">
        <SectionInner as="div">
          <Heading>Skills</Heading>
          <StyledDescription>Showcasing expertise and acquired skills.</StyledDescription>
          <SkillsContainer>
            <SkillsChartWrap as="div">
              <SkillsChart activeData={activeData}/>
            </SkillsChartWrap>
            <SkillsCardList>
            {skills.map((skill) => (
              <SkillsCardListItem key={skill.id}>
                <SkillsCard
                  role="button"
                  aria-label={`${skill.title}のスキルチャートを表示`}
                  onMouseOver={() => setActiveData(skill.id)}
                  className={`${skill.title} ${activeData === skill.id ? 'is-active' : ''}`}
                >
                  <FontAwesomeIcon icon={skill.icon} />
                </SkillsCard>
              </SkillsCardListItem>
            ))}
            </SkillsCardList>
          </SkillsContainer>
        </SectionInner>
      </SectionSkills>
      <SectionContact as="section" id="contact">
        <SectionInner as="div">
          <Heading>Contact</Heading>
          <StyledDescription>If you have any questions, please contact us using the form below.</StyledDescription>
          <ContactFormComponent as="div">
            <StyledContactCanvas width={360} height={360}/>
            <StyledContactForm />
          </ContactFormComponent>
        </SectionInner>
      </SectionContact>
      <Footer />
      </>
      ) : (
        <NowLoadingContainer>
          <Loading/>
          <p>Now loading...</p>
        </NowLoadingContainer>
      )}
    </>
  )
}
export default Home;