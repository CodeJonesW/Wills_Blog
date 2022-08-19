import styled from "styled-components";
import { Button } from "@mui/material";
import { motion } from "framer-motion";

export const LandingSection = styled(motion.div)`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: black;
  color: white;
`;

export const StyledButton = styled(Button)`
  font-size: 1.2em;
  max-width: 360px;
  max-height: 164px;
  padding: 8px;
  &:hover {
    background-color: white;
    color: black;
  }
  border-radius: 16px;
  font-family: "LemonMilkBold";
`;

export const UnshrinkableDiv = styled.div`
  flex-shrink: 0;
`;
