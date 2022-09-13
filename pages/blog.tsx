import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { FullScreenView, H3, HomeNavBar } from "../components/shared/styles";
import styles from "../styles/Home.module.css";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BlogContainer = styled(FullScreenView)`
  justify-content: center;
`;

const BlogNavbar = styled(HomeNavBar)``;

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
      <BlogContainer className={styles.quartzoBold}>
        <BlogNavbar>
          <H3>Blog</H3>
        </BlogNavbar>

        {posts.map((post, index) => {
          return (
            <div key={index}>
              <h1>{post.frontmatter.title}</h1>
              <p>{post.frontmatter.excerpt}</p>
            </div>
          );
        })}
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
