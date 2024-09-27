import { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import {
  BackArrow,
  BackArrowContainer,
  Circle,
  H3,
  ContactContainer,
  FlexColumnCenter,
  FullScreenColumn,
  SecondaryButton,
  Section2Content,
  Section2TopBar,
  UnshrinkableDiv,
  MailLink,
  OuterContainer,
} from "../components/shared/styles";
import { AnimatePresence } from "framer-motion";

const Section2 = styled(FullScreenColumn)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: black;
  overflow: scroll;
`;

export const Info: NextPage = () => {
  const router = useRouter();

  return (
    <AnimatePresence>
      <OuterContainer className={styles.quartzoBold}>
        <Section2
          className={styles.quartzoBold}
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 4, type: "spring" }}
        >
          <Section2TopBar
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 4, delay: 3, type: "spring" }}
          >
            <BackArrowContainer>
              <Circle
                onClick={() => {
                  router.push("/");
                }}
                style={{
                  borderColor: "white",
                }}
              >
                <BackArrow
                  style={{ position: "relative", top: "0", left: "-2px" }}
                />
              </Circle>
            </BackArrowContainer>
            <ContactContainer>
              <H3 style={{ color: "white" }}>williamjonescodes@gmail.com</H3>
            </ContactContainer>
          </Section2TopBar>
          <Section2Content
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 4, type: "spring" }}
          >
            <h3 style={{ fontSize: "2.2em", padding: "12px" }}>Hello World</h3>
            <UnshrinkableDiv style={{ height: "1%" }} />
            <FlexColumnCenter
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 4, delay: 2, type: "spring" }}
            >
              <p
                style={{
                  fontFamily: "MontserratMedium",
                  textAlign: "center",
                  maxWidth: "320px",
                  fontSize: "1.3em",
                  lineHeight: "1.5em",
                }}
              >
                I am a software engineer with a passion for solving problems. I
                love to learn and build new skills. Some of my personal
                interests are playing music, exercising, and cooking.
              </p>
              <p
                style={{
                  fontFamily: "MontserratMedium",
                  textAlign: "center",
                  fontSize: "1.3em",
                  lineHeight: "1.5em",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  marginBottom: "200px",
                }}
              >
                Over the past 5 years of my career, I have worked on a variety
                projects across different technology stacks. My experience with
                React, React Native, and Redux has given me the confidence to
                build, fix, and maintain production web and mobile applications.
                Over the last 2 years, I have loved writing Python code to
                create robust backend systems. I plan to continue developing
                across technology stacks with a focus on building scalable
                applications using cloud services. These experiences have given
                me the confidence that I can learn anything I put my mind to.
              </p>
              <UnshrinkableDiv style={{ height: "2vh" }} />
            </FlexColumnCenter>
          </Section2Content>
        </Section2>
      </OuterContainer>
    </AnimatePresence>
  );
};

export default Info;
