import type { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
const HomeContainer = styled.div``;

const LandingSection = styled.div`
  min-height: 772px;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: black;
`;

const LeftSection = styled.div`
  display: flex;
  flex: 40%;
  background-color: black;
  min-height: 772px;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  align-content: center;
`;

const RightSection = styled.div`
  display: flex;
  font-family: "MontserratBold";
  flex: 60%;
  min-height: 772px;
  text-align: left;
  justify-content: center;
  align-items: left;
  flex-direction: column;
  color: white;
`;

const ImageContainer = styled.div`
  max-width: 400px;
  max-height: 600px;
`;

const UnshrinkableDiv = styled.div`
  flex-shrink: 0;
`;

const MainLandingText = styled.div`
  min-width: 200px;
  min-height: 200px;
  flex-shrink: 0;

  font-weight: 400;
`;

const SecondaryLandingTextRow = styled.div`
  min-width: 200px;
  min-height: 100px;
  flex-shrink: 0;
  max-width: 80%;
  line-height: 40px;
  flex-direction: row;
  display: flex;
`;

const Button = styled.button`
  font-size: 1.2em;
  padding: 8px;
  background-color: white;
  border-radius: 16px;
  font-family: "LemonMilkBold";
`;

const Home: NextPage = () => {
  return (
    <HomeContainer>
      <LandingSection>
        <LeftSection>
          <Image src="/demoImage.jpeg" width={375} height={425} />
        </LeftSection>
        <RightSection>
          <MainLandingText>
            <h1>Web Expert Studio</h1>

            <UnshrinkableDiv style={{ height: 20 }} />
            <h2>
              I love helping businesses use technology to make more money and
              make lives easier.
            </h2>
            <SecondaryLandingTextRow style={{ fontFamily: "MontserratMedium" }}>
              <h3>
                Understanding business needs and selecting technologies will
                best server our customers long term is our specialty.
              </h3>
            </SecondaryLandingTextRow>
            <UnshrinkableDiv style={{ height: 20 }} />
            <SecondaryLandingTextRow>
              <Button>
                <h3>Learn how we can expand your business</h3>
              </Button>
              <UnshrinkableDiv style={{ width: 10 }} />
              <Button className={styles.quartzoBold}>
                <h3>Book a free consultation</h3>
              </Button>
            </SecondaryLandingTextRow>

            <UnshrinkableDiv style={{ height: 10 }} />
            <h3>Consulting, Design, Development</h3>
            <h4>Asheville, North Carolina</h4>
          </MainLandingText>
        </RightSection>
      </LandingSection>
    </HomeContainer>
  );
};

export default Home;
