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
          <MailLink
            style={{ textDecoration: "none" }}
            href="mailto:will@webexpertstudios.com?subject=Website%20Interest"
            target="_blank"
            rel="noreferrer"
          >
            <H3 style={{ color: "white" }}>will@webexpertstudios.com</H3>
          </MailLink>
        </ContactContainer>
      </Section2TopBar>
      <Section2Content
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 4, type: "spring" }}
      >
        <h3 style={{ fontSize: "2.2em", padding: "12px" }}>
          A websites design is the #1 factor in determining the credibility of a
          business.
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
            }}
          >
            Lets define what success looks like and work backwards from there.
          </p>
          <UnshrinkableDiv style={{ height: "2vh" }} />
          <MailLink
            style={{ textDecoration: "none" }}
            href="mailto:will@webexpertstudios.com?subject=Website%20Interest"
            target="_blank"
            rel="noreferrer"
          >
            <SecondaryButton>
              <h3>Lets get in touch</h3>
            </SecondaryButton>
          </MailLink>
        </FlexColumnCenter>
      </Section2Content>
    </Section2>
  );
};

export default Info;
