import type { NextPage } from "next";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ArrowContainer,
  Circle,
  H1,
  CompanyNameContainer,
  CompanyTagline,
  H3,
  ContactContainer,
  FullScreenView,
  HomeNavBar,
  InfoText,
  LandingSection,
  OuterContainer,
  PrimaryButton,
  SecondaryButton,
  TagLineContainer,
  MailLink,
  UnshrinkableDiv,
} from "../components/shared/styles";

const BlogLink = styled.a`
  color: black;
  cursor: pointer;
`;
const Section1 = styled(LandingSection)`
  background-color: white;
  width: 100vw;
  height: 200vh;
  justify-content: flex-start;
  flex-direction: column;
`;

const CompanyName = styled(H1)`
  max-width: 200px;
`;

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <AnimatePresence>
      <OuterContainer className={styles.quartzoBold}>
        <Section1>
          <FullScreenView
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 4, type: "spring" }}
          >
            <HomeNavBar>
              <CompanyNameContainer>
                <CompanyName>Web Expert Studios</CompanyName>
              </CompanyNameContainer>

              <ContactContainer>
                <Link href="/blog">
                  <BlogLink>
                    <H3>Blog</H3>
                  </BlogLink>
                </Link>
                <UnshrinkableDiv style={{ width: "16px" }} />
                <MailLink
                  style={{ textDecoration: "none" }}
                  href="mailto:will@webexpertstudios.com?subject=Website%20Interest"
                  target="_blank"
                  rel="noreferrer"
                >
                  <H3>Contact</H3>
                </MailLink>
              </ContactContainer>
            </HomeNavBar>
            <TagLineContainer>
              <CompanyTagline>Technical creativity applied.</CompanyTagline>
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
                  fontSize: "1.8em",
                  textAlign: "left",
                  maxWidth: "600px",
                  lineHeight: "1.5em",
                  color: "white",
                }}
              >
                Effective business solutions can make a real difference, and I
                am always looking for new opportunities to help people reach
                their full potential.
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
                    router.push("/info");
                  }}
                  style={{ marginBottom: "16px" }}
                >
                  <h3>Want to chat?</h3>
                </SecondaryButton>
                <UnshrinkableDiv style={{ width: "10px", height: "10px" }} />
                {/* <a
                  style={{ textDecoration: "none" }}
                  href="https://calendly.com/webexpertstudios/30min?back=1&month=2022-09"
                  target="_blank"
                  rel="noreferrer"
                >
                  <PrimaryButton style={{ marginBottom: "16px" }}>
                    <h3>Book a free consultation</h3>
                  </PrimaryButton>
                </a> */}
              </motion.div>
            </div>
          </FullScreenView>
        </Section1>
      </OuterContainer>
    </AnimatePresence>
  );
};

export default Home;
