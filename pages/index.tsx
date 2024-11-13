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
import { UnshrinkableDiv } from "../components/shared/styles";
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

  @media (max-width: 768px) {
    width: 40px;
    height: 100px;
    padding: 8px;
  }
`;

export default function Home({ posts }: BlogProps) {
  const theme = useTheme();
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, type: "spring" }}
        style={{
          padding: "24px",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography color="text.primary">williamjonescodes.com</Typography>
          </Box>
          <Box display="flex" flexDirection={"row"}>
            <Link href="/projects">
              <Typography color="text.primary">Projects</Typography>
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            padding: "24px",
          }}
        >
          <Box sx={{ paddingRight: "24px" }}>
            <ProfileImage src="selfie.jpg" />
            <Typography
              variant="body1"
              sx={{ maxWidth: "400px" }}
              color="text.primary"
            >
              Whats up! I'm Will Jones, a software engineer and entrepreneur.
            </Typography>
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
