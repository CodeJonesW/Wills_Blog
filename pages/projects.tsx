import Link from "next/link";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { motion } from "framer-motion";
import {
  Div,
  H3,
  ContactContainer,
  HomeNavBar,
  OuterContainer,
  UnshrinkableDiv,
  FullScreenColumn,
} from "../components/shared/styles";

const Body = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const TopLeftTitle = styled(H3)`
  max-width: 200px;
`;

export default function Projects() {
  return (
    <AnimatePresence>
      <OuterContainer className={styles.AngleterreBook}>
        <FullScreenColumn
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
        >
          <HomeNavBar>
            <Div>
              <TopLeftTitle>{"williamjonescodes.com"}</TopLeftTitle>
            </Div>
            <ContactContainer>
              <Link style={{ color: "black" }} href="/">
                <H3 style={{}}>Blog</H3>
              </Link>
              <UnshrinkableDiv style={{ width: "16px" }} />
            </ContactContainer>
          </HomeNavBar>
          <Body>
            <li>
              <a href="https://www.mygoalcreator.com">My Goal Creator</a> - A
              goal setting app that helps you set and track your goals with AI.
            </li>
          </Body>
        </FullScreenColumn>
      </OuterContainer>
    </AnimatePresence>
  );
}
