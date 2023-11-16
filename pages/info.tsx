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
  LandingSection,
  SecondaryButton,
  Section2Content,
  Section2TopBar,
  UnshrinkableDiv,
  MailLink,
} from "../components/shared/styles";

const Section2 = styled(LandingSection)`
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const Info: NextPage = () => {
  const router = useRouter();

  return (
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
        <h3 style={{ fontSize: "2.2em", padding: "12px" }}>
          Designing systems is tough.
        </h3>
        <UnshrinkableDiv style={{ height: "5%" }} />
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
            I&apos;m a software engineer with a passion for solving problems.
          </p>
          <UnshrinkableDiv style={{ height: "2vh" }} />
          <SecondaryButton>
            <h3>Email me</h3>
          </SecondaryButton>
        </FlexColumnCenter>
      </Section2Content>
    </Section2>
  );
};

export default Info;
