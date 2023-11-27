import { H3, HomeNavBar, FullScreenColumn } from "../components/shared/styles";
import styled from "styled-components";
import { post, routes, theme } from "../enums";
import { Box, Divider, List, ListItem, Grid } from "@mui/material";
import Link from "next/link";
import ExperienceSection from "../components/resume/experienceSection";
interface BlogProps {
  posts: post[];
}
const NavbarTitle = styled(H3)`
  max-width: 200px;
`;
const NavLink = styled.a`
  color: black;
  cursor: pointer;
`;

export default function Resume({ posts }: BlogProps) {
  return (
    <FullScreenColumn
      whileInView={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 4, type: "spring" }}
    >
      <HomeNavBar>
        <NavbarTitle>Resume</NavbarTitle>
        <Link style={{ color: "black" }} href={routes.home}>
          <NavbarTitle>Home</NavbarTitle>
        </Link>
      </HomeNavBar>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <h2>William Jones</h2>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingLeft: "32px",
          }}
        >
          <h5>Experience</h5>
        </div>
        <Divider sx={{ mr: "24px", ml: "24px" }} />
        <Grid
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingLeft: "32px",
          }}
        >
          <Grid item xs={12}>
            <h5 style={{ marginBottom: "4px", marginTop: "8px" }}>
              Software Engineer 2
            </h5>
            <p style={{ margin: 0, padding: 0 }}>Nimbio | Remote</p>
            <List>
              <ListItem>
                <p style={{ margin: 0, padding: 0 }}>
                  - Currently I work as Nimbio's primary backend engineer using
                  python. My work supports features related to our mobile, web,
                  and firmware applications.
                </p>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <ExperienceSection
          title="Lead Software Engineer"
          company="Ponder"
          location="Remote"
          bullets={[
            "Develop a full redesign of our React Native application using audio recording and playback features",
            "Collaborate with product team to develop designs and roadmaps",
            "Lead weekly sprint meetings, manage application deployments, and define development processes",
            "Implemented deep linking solution for React Native application",
            "Implemented use of OpenAi library as a resource to support features using Ai speech to text summarization",
          ]}
        />
        <ExperienceSection
          title="Software Engineer"
          company="ArchetypeSC Technology Consulting"
          location="Remote"
          bullets={[
            "Develop and manage all aspects of the company's React projects.",
            "Work with a team to develop features for a travel site built with .NET framework",
            "Develop features, provide application support, and deploy new versions for a client/'s internal tool built with Angular ",
            "Provide consulting on technical solutions for the team’s new projects in React",
          ]}
        />
        <ExperienceSection
          title="Senior Technical Learning Facilitator "
          company="Trilogy Education Services (2U)"
          location="Remote"
          bullets={[
            "Manage a roster of over 30 students weekly tutorial scheduling. ",
            "Provide one on one assistance to students learning programming concepts and developing applications",
            "Completed over 800 tutoring sessions with an average 4.8/5.0 student review rating",
            "Analyze homework assignments and provide well written critiques as to why the application was successful, what bugs exist and how to implement solutions.",
          ]}
        />
      </div>
    </FullScreenColumn>
  );
}
