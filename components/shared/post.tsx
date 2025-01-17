import Link from "next/link";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";
import { post } from "../../enums";
import { motion } from "framer-motion";
interface PostProps {
  post: post;
  selectPost: (slug: string) => void;
}

const PostContainer = styled(motion.div)`
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

export default function Post({ post, selectPost }: PostProps) {
  const { slug, frontmatter } = post;
  return (
    <PostContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 8, type: "spring" }}
    >
      <Link href={`/blog/${slug}`}>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <PostImage
            style={{ width: "64px", height: "64px", marginTop: "16px" }}
            loading="lazy"
            src={frontmatter.cover_image}
          />
          <Box sx={{ paddingLeft: "16px" }}>
            <Typography variant="body1" color="text.primary">
              {frontmatter.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {frontmatter.date}
            </Typography>
          </Box>
        </Box>
      </Link>
    </PostContainer>
  );
}
