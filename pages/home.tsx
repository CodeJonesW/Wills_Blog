import type { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import { Button } from "@mui/material";
import { motion, useScroll } from "framer-motion";
import { useAnimationControls } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const HomeContainer = styled.div``;

const LandingSection = styled.div`
  min-height: 844px;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: black;
  color: white;
`;

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

const UnshrinkableDiv = styled.div`
  flex-shrink: 0;
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

const StyledButton = styled(Button)`
  font-size: 1.2em;
  padding: 8px;
  &:hover {
    background-color: white;
    color: black;
  }
  border-radius: 16px;
  font-family: "LemonMilkBold";
`;

const SubText = styled.div`
  font-family: "MontserratMedium";
`;

const CompanyName = styled.h1`
  font-family: "LemonMilkBold";
`;

const ActionTextSection = styled.h1`
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
  const controls = useAnimationControls();
  const controls2 = useAnimationControls();
  const controls3 = useAnimationControls();
  const [isWhyIsOpen, setIsWhyIsOpen] = useState(false);
  const scrollToLocationRef = useRef<HTMLDivElement>(null);

  const onTap = (event: any, info: any) => {
    controls3.start({ opacity: 0, transition: { duration: 1.2 } });
    if (!isWhyIsOpen) {
      controls.start({ opacity: 1, y: -48, transition: { duration: 1.2 } });
      setIsWhyIsOpen(true);
    } else {
      controls.start({ opacity: 0, y: 0, transition: { duration: 1.2 } });
      setIsWhyIsOpen(false);
    }
    setTimeout(() => {
      controls2.start({ opacity: 1, y: -48, transition: { duration: 1.2 } });
    }, 3000);
  };

  const { scrollY } = useScroll();

  const scrollHalf = () =>
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });

  return (
    <HomeContainer className={styles.quartzoBold}>
      <LandingSection>
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
                  scrollHalf();
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
            <SubText>
              <h3>Consulting, Design, Development</h3>
              <h4>Asheville, North Carolina</h4>
            </SubText>
          </MainLandingText>
        </RightSection>
      </LandingSection>
      <LandingSection
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <motion.div initial={{ opacity: 1 }} animate={controls3}>
          <motion.div
            ref={scrollToLocationRef}
            style={{
              display: "flex",
              justifyContent: "center",
              width: 400,
              height: 100,
              backgroundColor: "white",
            }}
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 4, type: "spring" }}
            className="box"
            onTap={onTap}
          >
            <ActionTextSection>Why us?</ActionTextSection>
          </motion.div>
        </motion.div>
        <motion.div
          style={{
            color: "white",
            fontFamily: "MontserratBold",
            maxWidth: "700px",
            paddingTop: "64px",
            textAlign: "center",
            fontWeight: "bold",
          }}
          initial={{ opacity: 0 }}
          animate={controls}
        >
          <h3 style={{ fontSize: "48px" }}>
            We know what tools will serve your business best.
          </h3>
          <UnshrinkableDiv style={{ height: 164 }} />
          <motion.div initial={{ opacity: 0 }} animate={controls2}>
            <StyledButton variant="contained" style={{ padding: "16px" }}>
              You want to manage the site yourself?
            </StyledButton>
            <UnshrinkableDiv style={{ height: "48px" }} />
            <StyledButton style={{ padding: "16px" }}>
              Maybe have someone else do it.
            </StyledButton>
          </motion.div>
        </motion.div>
      </LandingSection>
    </HomeContainer>
  );
};

export default Home;
