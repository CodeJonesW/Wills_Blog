import type { NextPage } from "next";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import {
  ArrowContainer,
  BackArrow,
  BackArrowContainer,
  Circle,
  CompanyName,
  CompanyNameContainer,
  CompanyTagline,
  Contact,
  ContactContainer,
  FlexColumnCenter,
  FullScreenView,
  HomeNavBar,
  InfoText,
  LandingSection,
  OuterContainer,
  PrimaryButton,
  SecondaryButton,
  Section2Content,
  Section2TopBar,
  TagLineContainer,
  UnshrinkableDiv,
} from "../components/shared/styles";

// animate={{
//   x: 0,
//   backgroundColor: "#000",
//   boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
//   position: "fixed",
//   transitionEnd: {
//     display: "none",
//   },
// }}

const Home: NextPage = () => {
  const [isSection1Visible, setIsSection1Visible] = useState("flex");
  const [isSection2Visible, setIsSection2Visible] = useState("none");

  const Section1 = styled(LandingSection)`
    display: ${isSection1Visible};
    background-color: white;
    width: 100vw;
    height: 200vh;
    justify-content: flex-start;
    flex-direction: column;
  `;

  const Section2 = styled(LandingSection)`
    display: ${isSection2Visible};
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  `;

  const MailLink = styled.a`
    color: black;
  `;

  return (
    <AnimatePresence>
      <OuterContainer className={styles.quartzoBold}>
        <Section1>
          <FullScreenView
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 4, type: "spring" }}
          >
            <div>
              <HomeNavBar>
                <CompanyNameContainer>
                  <CompanyName>Web Expert Studios</CompanyName>
                </CompanyNameContainer>

                <ContactContainer>
                  <MailLink
                    style={{ textDecoration: "none" }}
                    href="mailto:will@webexpertstudios.com?subject=Website%20Interest"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Contact>will@webexpertstudios.com</Contact>
                  </MailLink>
                </ContactContainer>
              </HomeNavBar>
            </div>
            <TagLineContainer>
              <CompanyTagline>
                We create dynamic websites to help companies grow their brand.
              </CompanyTagline>
            </TagLineContainer>
            <UnshrinkableDiv style={{ height: "8%" }} />
            <ArrowContainer
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Circle
                onClick={() => {
                  window.scrollTo({
                    top: 1500,
                    behavior: "smooth",
                  });
                }}
              >
                <p>⬇</p>
              </Circle>
            </ArrowContainer>
            <UnshrinkableDiv style={{ height: "10%" }} />
          </FullScreenView>
          <FullScreenView
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "black",
              height: "100vh",
            }}
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 6, type: "spring" }}
          >
            <UnshrinkableDiv style={{ height: "10%" }} />
            <div
              style={{
                padding: "32px",
                alignItems: "center",
                maxWidth: "440px",
              }}
            >
              <InfoText
                style={{
                  fontSize: "1.1em",
                  textAlign: "left",
                  maxWidth: "600px",
                  color: "white",
                }}
              >
                Web Expert Studios specializes in creating websites for
                companies. As a hands-on creative partner, we are big on
                collaborating and prototyping. With experience in multiple
                disciplines, we help our clients earn their spot in peoples
                lives.
              </InfoText>
            </div>

            <div style={{ width: "100%" }}>
              <motion.div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "4px",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <SecondaryButton
                  onClick={() => {
                    setIsSection1Visible("none");
                    setIsSection2Visible("flex");
                  }}
                  style={{ marginBottom: "16px" }}
                >
                  <h3>Learn how we can expand your business</h3>
                </SecondaryButton>
                <UnshrinkableDiv style={{ width: "10px", height: "10px" }} />
                <a
                  style={{ textDecoration: "none" }}
                  href="https://calendly.com/webexpertstudios/30min?back=1&month=2022-09"
                  target="_blank"
                  rel="noreferrer"
                >
                  <PrimaryButton style={{ marginBottom: "16px" }}>
                    <h3>Book a free consultation</h3>
                  </PrimaryButton>
                </a>
              </motion.div>
            </div>
          </FullScreenView>
        </Section1>
        <Section2
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 4, type: "spring" }}
        >
          <Section2TopBar
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 4, delay: 3, type: "spring" }}
          >
            <BackArrowContainer>
              <Circle
                onClick={() => {
                  setIsSection1Visible("flex");
                  setIsSection2Visible("none");
                }}
                style={{
                  borderColor: "white",
                }}
              >
                <BackArrow
                  style={{ position: "relative", top: "0", left: "-2px" }}
                />
              </Circle>
            </BackArrowContainer>
            <ContactContainer>
              <MailLink
                style={{ textDecoration: "none" }}
                href="mailto:will@webexpertstudios.com?subject=Website%20Interest"
                target="_blank"
                rel="noreferrer"
              >
                <Contact style={{ color: "white" }}>
                  will@webexpertstudios.com
                </Contact>
              </MailLink>
            </ContactContainer>
          </Section2TopBar>
          <Section2Content
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 4, type: "spring" }}
          >
            <h3 style={{ fontSize: "2.2em", padding: "12px" }}>
              A website's design is the #1 factor in determining the credibility
              of a business.
            </h3>
            <UnshrinkableDiv style={{ height: 64 }} />
            <FlexColumnCenter
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 4, delay: 2, type: "spring" }}
            >
              <p
                style={{
                  fontFamily: "MontserratMedium",
                  textAlign: "center",
                  maxWidth: "320px",
                  fontSize: "1.3em",
                }}
              >
                Lets define what success looks like and work backwards from
                there.
              </p>
              <UnshrinkableDiv style={{ height: "2vh" }} />
              <MailLink
                style={{ textDecoration: "none" }}
                href="mailto:will@webexpertstudios.com?subject=Website%20Interest"
                target="_blank"
                rel="noreferrer"
              >
                <SecondaryButton>
                  <h3>Lets get in touch</h3>
                </SecondaryButton>
              </MailLink>
            </FlexColumnCenter>
          </Section2Content>
        </Section2>
      </OuterContainer>
    </AnimatePresence>
  );
};

export default Home;
