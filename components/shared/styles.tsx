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
  max-width: 336px;
  min-width: 336px;
  height: 104px;
  color: black;
  max-height: 144px;
  padding: 16px;
  text-align: center;
  background-color: white;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  border-style: solid;
  border-width: 2px;
  border-color: black;
  &:hover {
    cursor: pointer;
    border: 1px solid white;
    color: "white";
    box-shadow: 0 10px 20px rgba(225, 217, 231, 0.4);
  }
  border-radius: 16px;
  font-family: "LemonMilkBold";
`;

export const PrimaryButton = styled(motion.div)`
  display: flex;
  font-size: 1em;
  max-width: 336px;
  min-width: 336px;
  text-align: center;
  justify-content: center;
  align-items: center;
  max-height: 144px;
  height: 104px;
  background-color: black;
  color: white;
  border: 1px solid white;
  padding: 16px;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: white;
    cursor: pointer;
    color: "white";
    box-shadow: 0 10px 20px rgba(225, 217, 231, 0.4);
  }
  border-radius: 16px;
  font-family: "LemonMilkBold";
`;

export const UnshrinkableDiv = styled.div`
  flex-shrink: 0;
`;

export const MonterratBold = { fontFamily: "MontserratBold" };
export const MonterratMedium = { fontFamily: "MontserratMedium" };
