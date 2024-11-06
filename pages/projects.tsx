import Link from "next/link";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useRouter } from "next/router";
import fs from "fs";
import { motion } from "framer-motion";
import path from "path";
import matter from "gray-matter";
import { post } from "../enums";
import { sendAnalyticsEvent } from "../lib/google_analytics";
import Post from "../components/shared/post";
import {
  Div,
  H3,
  ContactContainer,
  HomeNavBar,
  OuterContainer,
  UnshrinkableDiv,
  FullScreenColumn,
} from "../components/shared/styles";

const Body = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const TopLeftTitle = styled(H3)`
  max-width: 200px;
`;

export default function Projects() {
  return (
    <AnimatePresence>
      <OuterContainer className={styles.quartzoBold}>
        <FullScreenColumn
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
        >
          <HomeNavBar>
            <Div>
              <TopLeftTitle>{"williamjonescodes.com"}</TopLeftTitle>
            </Div>
            <ContactContainer>
              <Link style={{ color: "black" }} href="/">
                <H3 style={{}}>Blog</H3>
              </Link>
              <UnshrinkableDiv style={{ width: "16px" }} />
            </ContactContainer>
          </HomeNavBar>
          <Body>
            <li>
              <a href="https://www.mygoalcreator.com">My Goal Creator</a> - A
              goal setting app that helps you set and track your goals with AI.
            </li>
          </Body>
        </FullScreenColumn>
      </OuterContainer>
    </AnimatePresence>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("assets/blog-posts"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(".md", "");

      const markdownWithMeta = fs.readFileSync(
        path.join("assets/blog-posts", filename),
        "utf-8"
      );

      const { data: frontmatter } = matter(markdownWithMeta);

      return { slug, frontmatter };
    })
    .sort((a, b) => {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    });

  return {
    props: {
      posts: posts,
    },
  };
}
