import styled from "styled-components";
import { motion } from "framer-motion";

export const OuterContainer = styled(motion.div)`
  background-color: black;
`;

export const FullScreenView = styled(motion.div)`
  height: 100vh;
`;

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
  max-width: 300px;
  min-width: 300px;
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
  touch-action: none;
  user-select: none;
`;

export const PrimaryButton = styled(motion.div)`
  display: flex;
  font-size: 1em;
  max-width: 300px;
  min-width: 300px;
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
  user-select: none;
  touch-action: none;
`;

export const UnshrinkableDiv = styled.div`
  flex-shrink: 0;
`;

export const MonterratBold = { fontFamily: "MontserratBold" };
export const MonterratMedium = { fontFamily: "MontserratMedium" };

export const ArrowContainer = styled.div``;

export const Circle = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  border-color: black;
  border-style: solid;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

export const ContactContainer = styled(motion.div)`
  padding-top: 1%;
  max-width: 220px;
  display: flex;
  flex-direction: row;
  justify-content: "center";
  align-items: "center";
`;
export const BackArrowContainer = styled(ContactContainer)`
  padding-top: 3%;
  &:hover {
    cursor: pointer;
  }
`;

export const BackArrow = styled(motion.i)`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;

  border-right: 10px solid white;
`;

export const H3 = styled.h3`
  font-size: 0.9em;
  font-family: "MontserratMedium";
  max-width: 80%;
`;

export const H4 = styled.h3`
  font-size: 0.7em;
  font-family: "MontserratMedium";
  max-width: 80%;
`;

export const CompanyName = styled.h1`
  font-family: "LemonMilkBold";
  color: "black";
  max-width: 200px;
  user-select: none;
`;

export const InfoText = styled(motion.h1)`
  font-family: "MontserratBold";
  color: black;
  text-align: center;
  font-size: 1.5em;
  line-height: 24px;
`;

export const CompanyTagline = styled.h2`
  font-family: "MontserratBold";
  max-width: 80%;
  font-size: 2em;
  color: black;
`;

export const HomeNavBar = styled.div`
  display: flex;
  max-width: 1350px;
  justify-content: space-between;
  padding-left: 4%;
  padding-right: 4%;
`;

export const TagLineContainer = styled.div`
  width: 100%;
  height: 40vh;
  align-items: center;
  justify-content: center;
  display: flex;
  padding-top: 5%;
`;

export const CompanyNameContainer = styled.div``;

export const FlexColumnCenter = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Section2TopBar = styled(motion.div)`
  display: flex;
  width: 92%;
  padding-left: 4%;
  padding-right: 4%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const Section2Content = styled(motion.div)`
  color: white;
  font-family: "MontserratBold";
  max-width: 700px;
  padding-top: 64px;
  text-align: center;
  font-weight: bold;
`;

export const MailLink = styled.a`
  color: black;
`;
