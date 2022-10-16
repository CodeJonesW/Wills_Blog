import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { post, routes, theme } from "../../enums/index";
import Back from "../../components/shared/back";
import styled from "styled-components";
import { H1, Section2TopBar as TopBar } from "../../components/shared/styles";
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
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 5%;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  max-width: 900px;
  max-height: 600px;
  min-width: 380px;
  min-height: 320px;
  object-fit: cover;
  border-radius: 10px;
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
        <Back route={routes.blog} themeProp={theme.light} />
      </TopBar>

      <PostContainer
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 4, type: "spring" }}
      >
        <H1>{title}</H1>
        <div>
          <PostImage src={cover_image} alt={title} />
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
