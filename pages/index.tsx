import type { NextPage } from "next";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { post, routes, theme } from "../enums";
import { sendAnalyticsEvent } from "../lib/google_analytics";
import Post from "../components/shared/post";
import {
  CompanyNameContainer,
  H3,
  ContactContainer,
  HomeNavBar,
  LandingSection,
  OuterContainer,
  UnshrinkableDiv,
} from "../components/shared/styles";

const NavLink = styled.a`
  color: black;
  cursor: pointer;
`;
const Section1 = styled(LandingSection)`
  background-color: white;
  width: 100vw;
  height: 100vh;
  justify-content: flex-start;
  flex-direction: column;
`;

const PostsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 15%;
  padding-top: 24px;
`;

const CompanyName = styled(H3)`
  max-width: 200px;
`;

interface BlogProps {
  posts: post[];
}

export default function Home({ posts }: BlogProps) {
  const router = useRouter();
  const selectPost = (slug: string) => {
    sendAnalyticsEvent("blogView", {
      action: "select_post",
      params: {
        post: slug,
      },
    });

    router.push(`/blog/${slug}`);
  };

  return (
    <AnimatePresence>
      <OuterContainer className={styles.quartzoBold}>
        <Section1>
          <HomeNavBar>
            <CompanyNameContainer>
              <CompanyName>Living, Learning, Refactoring</CompanyName>
            </CompanyNameContainer>

            <ContactContainer>
              <Link href="/info">
                <NavLink>
                  <H3 style={{ marginRight: 4 }}>About</H3>
                </NavLink>
              </Link>
              <Link href="/resume">
                <NavLink>
                  <H3 style={{ marginLeft: 4 }}>Resume</H3>
                </NavLink>
              </Link>
              <UnshrinkableDiv style={{ width: "16px" }} />
            </ContactContainer>
          </HomeNavBar>

          <PostsContainer>
            {posts.map((post, index) => {
              return <Post key={index} post={post} selectPost={selectPost} />;
            })}
          </PostsContainer>
        </Section1>
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
