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
  align-items: center;
  justify-content: center;
  padding: 16px;
  padding-bottom: 400px;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 16px;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const Content = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  font-size: 1.2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.4;
  }
  img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    margin: 16px 0;
  }
  video {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    margin: 16px 0;
  }
  pre {
    background-color: #f5f5f5; /* Background color for better contrast */
    padding: 16px; /* Padding around the code block */
    border-radius: 8px; /* Rounded corners */
    overflow-x: auto; /* Enable horizontal scrolling */
    font-size: 0.9rem; /* Adjust font size for readability */
    line-height: 1.4;
    max-width: 100%; /* Ensure code blocks don't overflow */
  }

  code {
    font-family: monospace; /* Use monospace font for code */
    display: block;
    white-space: pre-wrap; /* Allows line breaks in long code samples */
    word-break: break-word; /* Break long words for better responsiveness */
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.4;

    pre {
      padding: 12px; /* Adjust padding for smaller screens */
      font-size: 0.8rem; /* Slightly smaller font size on mobile */
    }
  }
`;

const PostImage = styled.img`
  width: 50%;
  height: 100%;
  max-width: 900px;
  max-height: 600px;
  min-width: 360px;
  min-height: 320px;
  object-fit: cover;
  border-radius: 40px;
  padding: 16px;
`;

export default function PostPage({
  frontmatter: { title, date, cover_image, hide_image_in_slug },
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
        <Back route={routes.home} themeProp={theme.light} />
      </TopBar>

      <PostContainer
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 4, type: "spring" }}
      >
        <H1>{title}</H1>
        {!hide_image_in_slug ? (
          <PostImage
            style={{ width: "300px", height: "300px" }}
            loading="lazy"
            src={cover_image}
            alt={title}
          />
        ) : null}
        <div
          style={{
            display: "flex-wrap",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Content
            style={{
              paddingLeft: "16px",
              paddingRight: "16px",
              marginBottom: "200px",
            }}
            dangerouslySetInnerHTML={{ __html: marked(content) }}
          ></Content>
        </div>
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
