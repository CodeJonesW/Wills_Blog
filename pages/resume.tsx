import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import {
  Div,
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
import Link from "next/link";
interface BlogProps {
  posts: post[];
}
const CompanyName = styled(H3)`
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
        <CompanyName>Resume</CompanyName>
        <Link href={routes.home}>
          <NavLink>
            <CompanyName>Home</CompanyName>
          </NavLink>
        </Link>
      </HomeNavBar>
    </FullScreenColumn>
  );
}
