import type { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";
import styles from "../../styles/Home.module.css";
import { Button } from "@mui/material";
import { AnimationControls, motion, useScroll } from "framer-motion";
import { useAnimationControls } from "framer-motion";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  LandingSection,
  StyledButton,
  UnshrinkableDiv,
} from "../shared/styles";
import { ActionTextSection } from "../../pages/home";

export const Packages = (controls: AnimationControls) => {
  return (
    <LandingSection
      initial={{ opacity: 1 }}
      animate={controls}
      className={styles.quartzoBold}
      style={{
        alignContent: "flex-start",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <UnshrinkableDiv style={{ height: 200 }} />
      <ActionTextSection
        style={{ textAlign: "center", color: "white", maxWidth: "480px" }}
      >
        We offer 3 website packages that set you up for independent success
      </ActionTextSection>
    </LandingSection>
  );
};

export default Packages;
