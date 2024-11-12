import Link from "next/link";
import styled from "styled-components";
import { post } from "../../enums";
import { H3, H4 } from "./styles";
import Image from "next/image";
interface PostProps {
  post: post;
  selectPost: (slug: string) => void;
}

const PostContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding-bottom: 24px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;
export const PostImage = styled.img`
  width: 40%;
  height: 40%;
  max-width: 300px;
  max-height: 600px;
  object-fit: cover;
  border-radius: 10px;
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 16px;
  padding-right: 8px;
`;

const PostTitle = styled(H3)`
  font-family: "AngleterreBook";
  color: "black";
  max-width: 600px;
  user-select: none;
`;

const PostDate = styled(H4)`
  font-family: "AngleterreBook";
  color: "black";
  max-width: 600px;
  user-select: none;
`;

const PostExcerpt = styled(H4)`
  font-family: "AngleterreBook";
  color: "black";
  max-width: 400px;
  user-select: none;
`;

export default function Post({ post, selectPost }: PostProps) {
  const { slug, frontmatter } = post;
  return (
    <PostContainer>
      <Link
        style={{ color: "inherit", display: "flex", flexDirection: "row" }}
        href={`/blog/${slug}`}
      >
        <PostImage
          style={{ width: "64px", height: "64px", marginTop: "16px" }}
          loading="lazy"
          src={frontmatter.cover_image}
        />
        <PostInfo>
          <PostTitle>{frontmatter.title}</PostTitle>
          <PostDate>{frontmatter.date}</PostDate>
          {/* <PostExcerpt>{frontmatter.excerpt}</PostExcerpt> */}
        </PostInfo>
      </Link>
    </PostContainer>
  );
}
