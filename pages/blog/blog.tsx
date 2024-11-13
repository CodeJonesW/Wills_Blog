import { motion } from "framer-motion";
import styled from "styled-components";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import router from "next/router";
import Post from "../../components/shared/post";
import { post } from "../../enums";
import { sendAnalyticsEvent } from "../../lib/google_analytics";
import { Box, Typography } from "@mui/material";

const PostsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 24px;
`;

interface BlogProps {
  posts: post[];
}

export default function Blog({ posts }: BlogProps) {
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "@media (max-width:768px)": {
          paddingLeft: "32px",
          paddingRight: "32px",
          paddingTop: "32px",
        },
      }}
    >
      <PostsContainer>
        <Typography
          sx={{ paddingBottom: "32px", paddingLeft: "4px" }}
          color="text.primary"
          variant="h3"
        >
          Blog
        </Typography>
        {posts.map((post, index) => {
          return <Post key={index} post={post} selectPost={selectPost} />;
        })}
      </PostsContainer>
    </Box>
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
