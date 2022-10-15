import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { FullScreenView, H3, HomeNavBar } from "../components/shared/styles";
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
import * as ga from "../lib/google_analytics";

const BlogContainer = styled(FullScreenView)`
  justify-content: center;
`;

const BlogNavbar = styled(motion.div)`
  padding-top: 5%;
  padding-left: 15%;
  width: 80%;
`;

const PostsContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 1%;
`;

export const PageHeader = styled(H3)`
  font-family: "LemonMilkBold";
  color: "black";
  max-width: 200px;
  user-select: none;
`;

interface BlogProps {
  posts: post[];
}

export default function Blog({ posts }: BlogProps) {
  const selectPost = (slug: string) => {
    ga.event({
      action: "blog_view",
      params: {
        search_term: slug,
      },
    });

    router.push(`/blog/${slug}`);
  };

  console.log(posts);
  return (
    <AnimatePresence>
      <BlogContainer
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 4, type: "spring" }}
        className={styles.quartzoBold}
      >
        <TopBar
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 4, type: "spring" }}
        >
          <Back route={routes.home} themeProp={theme.light} />
        </TopBar>
        <BlogNavbar>
          <PageHeader style={{ fontSize: "1.2em" }}>Blog</PageHeader>
        </BlogNavbar>
        <PostsContainer>
          {posts.map((post, index) => {
            return <Post key={index} post={post} selectPost={selectPost} />;
          })}
        </PostsContainer>
      </BlogContainer>
    </AnimatePresence>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("assets/blog-posts"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdownWithMeta = fs.readFileSync(
      path.join("assets/blog-posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return { slug, frontmatter };
  });

  return {
    props: {
      posts: posts,
    },
  };
}
