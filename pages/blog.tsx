import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { FullScreenView, H3, HomeNavBar } from "../components/shared/styles";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BlogContainer = styled(FullScreenView)`
  justify-content: center;
`;

const BlogNavbar = styled(HomeNavBar)``;

const PostsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10%;
`;

export const PageHeader = styled(H3)`
  font-family: "LemonMilkBold";
  color: "black";
  max-width: 200px;
  user-select: none;
`;

interface BlogProps {
  posts: {
    slug: string;
    frontmatter: {
      title: string;
      date: string;
      excerpt: string;
    };
  }[];
}

export default function Blog({ posts }: BlogProps) {
  console.log(posts);
  return (
    <AnimatePresence>
      <BlogContainer
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 4, type: "spring" }}
        className={styles.quartzoBold}
      >
        <BlogNavbar>
          <PageHeader style={{ fontSize: "1.2em" }}>Blog</PageHeader>
        </BlogNavbar>
        <PostsContainer>
          {posts.map((post, index) => {
            return (
              <div key={index}>
                <h1>{post.frontmatter.title}</h1>
                <p>{post.frontmatter.excerpt}</p>
              </div>
            );
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
