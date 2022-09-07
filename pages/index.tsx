import type { NextPage } from "next";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  LandingSection,
  PrimaryButton,
  SecondaryButton,
  UnshrinkableDiv,
} from "../components/shared/styles";
import { OutlinedCard } from "../components/shared/card";

const HomeContainer = styled(motion.div)`
  background-color: black;
  height: 100vh;
`;
// animate={{
//   x: 0,
//   backgroundColor: "#000",
//   boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
//   position: "fixed",
//   transitionEnd: {
//     display: "none",
//   },
// }}

const LeftSection = styled.div`
  display: flex;
  flex: 40%;
  background-color: white;
  min-height: 772px;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  align-content: center;
`;

const SecondaryLandingTextRow = styled.div`
  /* min-width: 200px; */
  min-height: 40px;
  flex-shrink: 0;
  max-width: 100%;
  line-height: 40px;
  flex-direction: row;
  display: flex;
`;

const CompanyName = styled.h1`
  font-family: "LemonMilkBold";
  color: "black";
  max-width: 240px;
`;

export const ActionTextSection = styled.h1`
  font-family: "MontserratBold";
  color: black;
  text-align: center;
  font-size: 1.5em;
  line-height: 50px;
`;

const CompanyTagline = styled.h2`
  font-family: "MontserratBold";
  max-width: 80%;
  font-size: 2em;
  color: black;
`;

const Contact = styled.h3`
  font-size: 0.9em;
  font-family: "MontserratMedium";
  max-width: 80%;
`;

const ContactContainer = styled.div`
  padding-top: 1%;
  max-width: 220px;
`;

const HomeNavBar = styled.div`
  display: flex;
  width: 90vw;
  /* min-width: 90vw; */
  padding-left: 4%;
  padding-right: 4%;
`;

const TagLineContainer = styled.div`
  width: 100%;
  height: 40vh;
  align-items: center;
  justify-content: center;
  display: flex;
  padding-top: 5%;
`;

const CompanyNameContainer = styled.div``;

const ArrowContainer = styled.div``;
const Circle = styled.div``;

const Home: NextPage = () => {
  const [isLandingSection1Visible, setIsLandingSection1Visible] =
    useState("flex");
  const [isLandingSection2Visible, setIsLandingSection2Visible] =
    useState("none");
  const [isLandingSection3Visible, setIsLandingSection3Visible] =
    useState("none");

  const HomeSection = styled(LandingSection)`
    display: ${isLandingSection1Visible};
    background-color: white;
    width: 100vw;
    height: 200vh;
    justify-content: flex-start;
    flex-direction: column;
  `;

  return (
    <HomeContainer className={styles.quartzoBold}>
      <HomeSection
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 4, type: "spring" }}
      >
        <HomeNavBar>
          <CompanyNameContainer>
            <CompanyName>Web Expert Studios</CompanyName>
          </CompanyNameContainer>
          <UnshrinkableDiv style={{ width: "0%" }} />
          <ContactContainer>
            <Contact>will@webexpertstudios.com</Contact>
          </ContactContainer>
        </HomeNavBar>
        <TagLineContainer>
          <CompanyTagline>
            We create dynamic brands to help new companies grow.
          </CompanyTagline>
        </TagLineContainer>
        <UnshrinkableDiv style={{ height: "8%" }} />
        <ArrowContainer
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Circle
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "100px",
              borderColor: "black",
              borderStyle: "solid",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>⬇</p>
          </Circle>
        </ArrowContainer>
        <UnshrinkableDiv style={{ height: "10%" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ padding: "32px", alignItems: "center" }}>
            <ActionTextSection
              style={{
                fontSize: "1.1em",
                textAlign: "left",
                maxWidth: "600px",
              }}
            >
              Web Expert Studios specializes in creating brands and websites for
              new companies. As a hands-on creative partner, were big on
              collaborating and prototyping. With experience in multiple
              disciplines we help our clients earn their spot in peoples lives.
            </ActionTextSection>
          </div>

          <div style={{ width: "100%" }}>
            <SecondaryLandingTextRow
              style={{
                padding: "4px",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <PrimaryButton
                onClick={() => {
                  setIsLandingSection1Visible("none");
                  setIsLandingSection2Visible("flex");
                }}
                style={{ marginBottom: "16px" }}
              >
                <h3>Learn how we can expand your business</h3>
              </PrimaryButton>
              <UnshrinkableDiv style={{ width: "10px", height: "10px" }} />
              <SecondaryButton style={{ marginBottom: "16px" }}>
                <h3>Book a free consultation</h3>
              </SecondaryButton>
            </SecondaryLandingTextRow>
          </div>
        </div>
        <UnshrinkableDiv style={{ height: "1%" }} />
      </HomeSection>
      <LandingSection
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 4, type: "spring" }}
        style={{
          display: isLandingSection2Visible,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <motion.div
          style={{
            display: "flex",
            width: "90%",
            paddingLeft: "5%",
            paddingRight: "5%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 4, delay: 3, type: "spring" }}
        >
          <ContactContainer>
            <Contact style={{ color: "white" }}>
              will@webexpertstudios.com
            </Contact>
          </ContactContainer>
        </motion.div>
        <motion.div
          style={{
            color: "white",
            fontFamily: "MontserratBold",
            maxWidth: "700px",
            paddingTop: "64px",
            textAlign: "center",
            fontWeight: "bold",
          }}
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 4, type: "spring" }}
        >
          <h3 style={{ fontSize: "2.2em", padding: "12px" }}>
            A website’s design is the #1 factor in determining the credibility
            of a business.
          </h3>
          <UnshrinkableDiv style={{ height: 64 }} />
          <motion.div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
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
            <UnshrinkableDiv style={{ height: "12vh" }} />
            <SecondaryButton>
              <h3>Lets get in touch</h3>
            </SecondaryButton>
          </motion.div>
        </motion.div>
      </LandingSection>

      <LandingSection
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 4, type: "spring" }}
        style={{
          alignContent: "flex-start",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          display: isLandingSection3Visible,
        }}
      >
        <UnshrinkableDiv style={{ height: "24px" }} />
        <ActionTextSection
          style={{ textAlign: "center", color: "white", maxWidth: "480px" }}
        >
          We offer 3 website packages that set you up for independent success
        </ActionTextSection>
        <SecondaryLandingTextRow style={{ flexWrap: "wrap" }}>
          <OutlinedCard
            price={"$2000"}
            setSectionVisible={setIsLandingSection3Visible}
            title="Basic"
            features={[
              "Custom domain name",
              "Email sign uplist",
              "6 static content pages dynamic to all screen sizes",
              "Provide designs to match business identity and goals.",
              "Review meeting at 60% completion",
              "At 100% completion, we send you a link to demo and we create a final revisions list.",
              "Documentation on how the setup works so you can continue to make updates and improve your site.",
            ]}
          />

          <OutlinedCard
            price={"$3000"}
            setSectionVisible={setIsLandingSection3Visible}
            title="Animated"
            features={[
              "Custom domain name",
              "Email sign uplist",
              "6 pages dynamic to all screen sizes",
              "6 animated content sections",
              "Provide designs to match business identity and goals.",
              "2 additional features like automated booking system and contact form.",
              "Review meeting at 75% completion",
              "At 100% completion, we send you a link to demo and we create a final revisions list.",
              "Documentation on how the site works so you can continue to make updates and improve your site.",
            ]}
          />
          <OutlinedCard
            price={"$4000"}
            setSectionVisible={setIsLandingSection3Visible}
            title="Animated Ecommerce"
            features={[
              "Custom domain name",
              "Email sign uplist",
              "6 animated content pages dynamic to all screen sizes",
              "Provide designs to match business identity and goals.",
              "2 additional features like automated booking system and contact form.",
              "Ability to add and sell products on your site",
              "Review meeting at 75% completion",
              "At 100% completion, we send you a link to demo and we create a final revisions list.",
              "Documentation on how the site works so you can continue to make updates and improve your site.",
            ]}
          />
        </SecondaryLandingTextRow>
        <UnshrinkableDiv style={{ height: "24px" }} />
      </LandingSection>
    </HomeContainer>
  );
};

export default Home;
