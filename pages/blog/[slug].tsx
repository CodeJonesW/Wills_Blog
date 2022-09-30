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

interface PostProps {
  frontmatter: post["frontmatter"];
  slug: string;
  content: string;
}

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10%;
`;

export default function PostPage({
  frontmatter: { title, date, cover_image },
  slug,
  content,
}: PostProps) {
  return (
    <div>
      <Link href="/">
        <Back themeProp={theme.light} />
      </Link>

      <PostContainer>
        <div>
          <PostImage
            style={{ maxWidth: "700px", maxHeight: "460px" }}
            src={cover_image}
            alt=""
          />
        </div>
        <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
      </PostContainer>
    </div>
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
