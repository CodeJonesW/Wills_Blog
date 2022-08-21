import type { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";
import styles from "../styles/Home.module.css";

import { motion, useScroll } from "framer-motion";
import { useAnimationControls } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import {
  LandingSection,
  StyledButton,
  UnshrinkableDiv,
} from "../components/shared/styles";
import { OutlinedCard } from "../components/shared/card";

const HomeContainer = styled(motion.div)`
  background-color: black;
`;
// animate={{
//   x: 0,
//   backgroundColor: "#000",
//   boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
//   position: "fixed",
//   transitionEnd: {
//     display: "none",
//   },
// }}

const LeftSection = styled.div`
  display: flex;
  flex: 40%;
  background-color: black;
  min-height: 772px;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  align-content: center;
`;

const RightSection = styled.div`
  display: flex;
  font-family: "MontserratBold";
  flex: 60%;
  min-height: 772px;
  text-align: left;
  justify-content: center;
  align-items: left;
  flex-direction: column;
  color: white;
`;

const MainLandingText = styled.div`
  min-width: 200px;
  min-height: 200px;
  flex-shrink: 0;

  font-weight: 400;
`;

const SecondaryLandingTextRow = styled.div`
  min-width: 200px;
  min-height: 40px;
  flex-shrink: 0;
  max-width: 80%;
  line-height: 40px;
  flex-direction: row;
  display: flex;
`;

const SubText = styled.div`
  font-family: "MontserratMedium";
`;

const CompanyName = styled.h1`
  font-family: "LemonMilkBold";
`;

export const ActionTextSection = styled.h1`
  font-family: "LemonMilkBold";
  color: black;
  text-align: center;
  line-height: 50px;
`;

const CompanyTagline = styled.h2`
  font-family: "MontserratBold";
  max-width: 80%;
`;

const CompanySubTagline = styled.h2`
  font-family: "MontserratMedium";
  max-width: 80%;
`;

const Home: NextPage = () => {
  const [isLandingSection1Visible, setIsLandingSection1Visible] =
    useState("flex");
  const [isLandingSection2Visible, setIsLandingSection2Visible] =
    useState("none");
  const [isLandingSection3Visible, setIsLandingSection3Visible] =
    useState("none");

  return (
    <HomeContainer className={styles.quartzoBold}>
      <LandingSection
        style={{ display: isLandingSection1Visible }}
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 4, type: "spring" }}
      >
        <LeftSection>
          <Image
            style={{ borderRadius: 200 }}
            src="/demoImage.jpeg"
            width={400}
            height={425}
          />
        </LeftSection>
        <RightSection>
          <MainLandingText>
            <CompanyName>Web Expert Studio</CompanyName>

            <UnshrinkableDiv style={{ height: 20 }} />
            <CompanyTagline>
              Helping businesses use technology to make more money and make
              lives easier.
            </CompanyTagline>
            <SecondaryLandingTextRow style={{ fontFamily: "MontserratMedium" }}>
              <CompanySubTagline></CompanySubTagline>
            </SecondaryLandingTextRow>
            <SecondaryLandingTextRow>
              <StyledButton
                onClick={() => {
                  setIsLandingSection1Visible("none");
                  setIsLandingSection2Visible("flex");
                }}
                variant="outlined"
              >
                <h3>Learn how we can expand your business</h3>
              </StyledButton>
              <UnshrinkableDiv style={{ width: 10 }} />
              <StyledButton variant="contained">
                <h3>Book a free consultation</h3>
              </StyledButton>
            </SecondaryLandingTextRow>

            <UnshrinkableDiv style={{ height: 10 }} />
          </MainLandingText>
        </RightSection>
      </LandingSection>
      <LandingSection
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 4, type: "spring" }}
        style={{
          display: isLandingSection2Visible,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <motion.div
          style={{
            color: "white",
            fontFamily: "MontserratBold",
            maxWidth: "700px",
            paddingTop: "64px",
            textAlign: "center",
            fontWeight: "bold",
          }}
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 4, type: "spring" }}
        >
          <h3 style={{ fontSize: "48px" }}>
            We know what tools will serve your business best.
          </h3>
          <UnshrinkableDiv style={{ height: 164 }} />
          <motion.div
            style={{ flexDirection: "row" }}
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 4, delay: 2, type: "spring" }}
          >
            <StyledButton
              onClick={() => {
                setIsLandingSection2Visible("none");
                setIsLandingSection3Visible("flex");
              }}
              variant="contained"
              style={{ padding: "16px" }}
            >
              Looking for something fast?
            </StyledButton>
            <UnshrinkableDiv style={{ height: "48px" }} />
            <StyledButton style={{ padding: "16px" }}>
              Maybe you need a custom solution?
            </StyledButton>
          </motion.div>
        </motion.div>
      </LandingSection>

      <LandingSection
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 4, type: "spring" }}
        style={{
          alignContent: "flex-start",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          display: isLandingSection3Visible,
        }}
      >
        <UnshrinkableDiv style={{ height: 100 }} />
        <ActionTextSection
          style={{ textAlign: "center", color: "white", maxWidth: "480px" }}
        >
          We offer 3 website packages that set you up for independent success
        </ActionTextSection>
        <SecondaryLandingTextRow style={{ flexWrap: "wrap" }}>
          <OutlinedCard
            title="The basics for success"
            features={[
              "Initial design and planning meeting (1 hour)",
              "Review meeting at 60% completion (30 minutes)",
              "At 100% completion, we send you a link to demo and we create a final revisions list.",
              "Documentation on how the site works so you can continue to make updates and improve your site.",
            ]}
          />
          <OutlinedCard
            title="The basics for success"
            features={[
              "Initial design and planning meeting (1 hour)",
              "Review meeting at 60% completion (30 minutes)",
              "At 100% completion, we send you a link to demo and we create a final revisions list.",
              "Documentation on how the site works so you can continue to make updates and improve your site.",
            ]}
          />
          <OutlinedCard
            title="The basics for success"
            features={[
              "Initial design and planning meeting (1 hour)",
              "Review meeting at 60% completion (30 minutes)",
              "At 100% completion, we send you a link to demo and we create a final revisions list.",
              "Documentation on how the site works so you can continue to make updates and improve your site.",
            ]}
          />
        </SecondaryLandingTextRow>
      </LandingSection>
    </HomeContainer>
  );
};

export default Home;
