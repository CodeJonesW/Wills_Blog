import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { motion } from "framer-motion";
import {
  ContactContainer,
  HomeNavBar,
  UnshrinkableDiv,
} from "../components/shared/styles";
import { Box, List, ListItemButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material";

const projects = [
  {
    name: "WeightLiftr",
    description:
      "Web app for tracking exercises in the gym and reviewing stats",
    link: "https://weightliftr.com/",
  },
  {
    name: "My Goal Creator",
    description:
      "A goal setting app that helps you set and track your goals with AI.",
    link: "https://www.mygoalcreator.com",
  },
];
export default function Projects() {
  const theme = useTheme();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, type: "spring" }}
      >
        <HomeNavBar>
          <Box>
            <Typography color="text.primary">
              {"williamjonescodes.com"}
            </Typography>
          </Box>
          <ContactContainer>
            <Link href="/">
              <Typography color="text.primary">Blog</Typography>
            </Link>
            <UnshrinkableDiv style={{ width: "16px" }} />
          </ContactContainer>
        </HomeNavBar>

        <Box
          sx={{
            padding: "32px",
            "@media (max-width:768px)": {
              padding: "0px",
            },
          }}
        >
          <List>
            {projects.map((project, index) => (
              <ListItemButton
                sx={{
                  "@media (max-width:768px)": {
                    padding: "8px",
                  },
                }}
                href={project.link}
                key={index}
              >
                <Box
                  sx={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    padding: "16px",
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "8px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    "@media (max-width:768px)": {
                      padding: "8px",
                    },
                  }}
                >
                  <Typography variant="h6" color="text.primary">
                    {project.name}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ marginBottom: "16px" }}
                  >
                    {project.description}
                  </Typography>
                  <iframe
                    src={project.link}
                    style={{
                      width: "100%",
                      height: "500px",
                      border: "none",
                      borderRadius: "8px",
                    }}
                    title={project.name}
                  />
                </Box>
              </ListItemButton>
            ))}
          </List>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}
