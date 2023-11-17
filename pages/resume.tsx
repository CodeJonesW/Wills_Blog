import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import {
  CompanyNameContainer,
  ContactContainer,
  FullScreenView,
  H3,
  HomeNavBar,
  InfoText,
  UnshrinkableDiv,
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
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100vw",
        }}
      >
        <div>
          <CompanyName>Resume</CompanyName>
        </div>
        <div>
          <Link href={routes.home}>
            <NavLink>
              <CompanyName>Home</CompanyName>
            </NavLink>
          </Link>
        </div>
      </div>
    </div>
  );
}
