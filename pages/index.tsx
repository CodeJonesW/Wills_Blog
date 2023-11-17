import type { NextPage } from "next";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useRouter } from "next/router";
import {
  H1,
  CompanyTagline,
  H3,
  FullScreenView,
  HomeNavBar,
  LandingSection,
  OuterContainer,
  TagLineContainer,
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
              <H3>Live, Learn, Refactor</H3>
            </HomeNavBar>
            <TagLineContainer>
              <CompanyTagline>Under Construction.</CompanyTagline>
            </TagLineContainer>
          </FullScreenView>
        </Section1>
      </OuterContainer>
    </AnimatePresence>
  );
};

export default Home;
