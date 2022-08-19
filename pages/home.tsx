import type { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";
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
import Packages from "../components/home/packages";

const HomeContainer = styled(motion.div)``;

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
  const controls = useAnimationControls();
  const controls2 = useAnimationControls();
  const controls3 = useAnimationControls();
  const homeControls = useAnimationControls();
  const packagesControls = useAnimationControls();
  const [isWhyIsOpen, setIsWhyIsOpen] = useState(false);

  const onTap = (event: any, info: any) => {
    controls3.start({ opacity: 0, transition: { duration: 1.2 } });
    if (!isWhyIsOpen) {
      controls.start({ opacity: 1, y: -48, transition: { duration: 1.2 } });
      setIsWhyIsOpen(true);
    } else {
      controls.start({ opacity: 0, y: 0, transition: { duration: 1.2 } });
      setIsWhyIsOpen(false);
    }
    controls2.start({
      opacity: 1,
      y: -48,
      transition: { duration: 1.2, delay: 3 },
    });
  };

  const scrollToPackages = async () => {
    scrollSections(2);

    packagesControls.start({
      opacity: 1,
      transition: { duration: 1.2 },
    });
  };

  const { scrollY } = useScroll();

  const scrollSections = (numOfSections = 1) =>
    window.scrollTo({ top: 844 * numOfSections, behavior: "smooth" });

  return (
    <HomeContainer className={styles.quartzoBold}>
      <LandingSection animate={homeControls}>
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
                  scrollSections(1);
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
        animate={homeControls}
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <motion.div initial={{ opacity: 1 }} animate={controls3}>
          <motion.div
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
          <motion.div
            style={{ flexDirection: "row" }}
            initial={{ opacity: 0 }}
            animate={controls2}
          >
            <StyledButton
              onClick={() => scrollSections(2)}
              variant="contained"
              style={{ padding: "16px" }}
            >
              Want us to build you an amazing website and set you up to manage
              it?
            </StyledButton>
            <UnshrinkableDiv style={{ height: "48px" }} />
            <StyledButton style={{ padding: "16px" }}>
              Think you might need a custom solution?
            </StyledButton>
          </motion.div>
        </motion.div>
      </LandingSection>

      <Packages {...packagesControls} />
    </HomeContainer>
  );
};

export default Home;
