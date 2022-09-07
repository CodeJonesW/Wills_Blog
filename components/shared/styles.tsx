import styled from "styled-components";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import styles from "../../styles/Home.module.css";

export const LandingSection = styled(motion.div)`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: black;
  /* color: white; */
`;

export const SecondaryButton = styled(motion.div)`
  display: flex;
  font-size: 1em;
  max-width: 360px;
  min-width: 360px;
  color: black;
  max-height: 144px;
  padding: 16px;
  text-align: center;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: black;
    color: white;
  }
  border-radius: 16px;
  font-family: "LemonMilkBold";
`;

export const PrimaryButton = styled(motion.div)`
  display: flex;
  font-size: 1em;
  max-width: 344px;
  text-align: center;
  justify-content: center;
  align-items: center;
  max-height: 144px;
  background-color: black;
  color: white;
  padding: 16px;
  &:hover {
    background-color: black;
    color: white;
  }
  border-radius: 16px;
  font-family: "LemonMilkBold";
`;

export const UnshrinkableDiv = styled.div`
  flex-shrink: 0;
`;

export const MonterratBold = { fontFamily: "MontserratBold" };
export const MonterratMedium = { fontFamily: "MontserratMedium" };
