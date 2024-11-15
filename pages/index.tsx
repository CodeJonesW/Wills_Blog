import Link from "next/link";
import styled from "styled-components";
import { useTheme } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import React from "react";
import fs from "fs";
import { motion } from "framer-motion";
import path from "path";
import matter from "gray-matter";
import { post } from "../enums";
import { Box, Typography } from "@mui/material";
import Blog from "./blog/blog";

interface BlogProps {
  posts: post[];
}

const ProfileImage = styled.img`
  width: 100px;
  height: 400px;
  max-width: 900px;
  max-height: 600px;
  min-width: 360px;
  min-height: 320px;
  object-fit: cover;
  border-radius: 50%;
  padding: 16px;
  object-fit: cover;
  margin-bottom: "16px";
`;

export default function Home({ posts }: BlogProps) {
  const theme = useTheme();
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4, type: "spring" }}
        style={{
          backgroundColor: theme.palette.background.default,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "16px",
          }}
        >
          <Typography variant="h4" color="text.primary">
            williamjonescodes.com
          </Typography>
          <Link href="/projects">
            <Typography variant="body1" color="text.primary">
              Projects
            </Typography>
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "40%",
              "@media (max-width: 768px)": {
                width: "100%",
              },
            }}
          >
            <ProfileImage src="selfie.jpg" />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid",
                borderColor: "text.primary",
                borderRadius: "4px",
                padding: "16px",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  maxWidth: "375px",
                  whiteSpace: "pre-line",
                }}
                color="text.primary"
              >
                {`Hi! 👋🏻 I'm Will Jones.
                
                I am passionate about solving problems with software and creating things that make the world a better place. 

                I love clean code, beautiful (system) design, and fast functionality.`}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid",
                borderColor: "text.primary",
                borderRadius: "4px",
                padding: "16px",
                marginTop: "32px",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  maxWidth: "375px",
                  whiteSpace: "pre-line",
                }}
                color="text.primary"
              >
                {`Im the backend developer who also makes clean user interfaces.
                
                A few technologies I've been working with recently:
                - React
                - TypeScript
                - Python
                - PostgreSQL
                - AWS
                `}
              </Typography>
            </Box>
          </Box>
          <Blog posts={posts} />
        </Box>
      </motion.div>
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
