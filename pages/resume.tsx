import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import {
  ContactContainer,
  FullScreenView,
  H3,
  HomeNavBar,
  InfoText,
  UnshrinkableDiv,
  FullScreenColumn,
} from "../components/shared/styles";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import router from "next/router";
import Post from "../components/shared/post";
import { post, routes, theme } from "../enums";
import { Section2TopBar as TopBar } from "../components/shared/styles";
import Back from "../components/shared/back";
import { sendAnalyticsEvent } from "../lib/google_analytics";
import { Box, Divider, List, ListItem, Grid } from "@mui/material";
import Link from "next/link";
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
    <FullScreenColumn>
      <HomeNavBar>
        <NavbarTitle>Resume</NavbarTitle>
        <Link href={routes.home}>
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
                  - Developed a new feature for the Nimbio platform that allows
                  users to create custom forms for their organization to use
                  when collecting data.
                </p>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </div>
    </FullScreenColumn>
  );
}
