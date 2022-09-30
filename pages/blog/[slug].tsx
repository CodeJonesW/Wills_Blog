import fs from "fs";
import path from "path";
import matter from "gray-matter";
// import type { marked } from "marked";
import { marked } from "marked";
import Link from "next/link";
import { post, theme } from "../../enums/index";
import Back from "../../components/shared/back";
import styled from "styled-components";
import { PostImage } from "../../components/shared/post";
import { Section2TopBar as TopBar } from "../../components/shared/styles";
import { motion } from "framer-motion";

interface PostProps {
  frontmatter: post["frontmatter"];
  slug: string;
  content: string;
}

const PostContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10%;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export default function PostPage({
  frontmatter: { title, date, cover_image },
  slug,
  content,
}: PostProps) {
  return (
    <PageContainer>
      <TopBar
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 4, type: "spring" }}
      >
        <Link href="/blog">
          <Back themeProp={theme.light} />
        </Link>
      </TopBar>

      <PostContainer
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 4, type: "spring" }}
      >
        <div>
          <PostImage
            style={{ maxWidth: "700px", maxHeight: "460px" }}
            src={cover_image}
            alt=""
          />
        </div>
        <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
      </PostContainer>
    </PageContainer>
  );
}

interface getStaticPathsProps {
  params: {
    slug: string;
  };
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("assets/blog-posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params: { slug },
}: getStaticPathsProps) {
  const markdownWithMeta = fs.readFileSync(
    path.join("assets/blog-posts", slug + ".md"),
    "utf-8"
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}
