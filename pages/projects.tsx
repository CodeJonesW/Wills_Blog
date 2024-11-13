import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { motion } from "framer-motion";
import {
  ContactContainer,
  HomeNavBar,
  UnshrinkableDiv,
} from "../components/shared/styles";

import { Box, List, ListItem, Typography } from "@mui/material";

export default function Projects() {
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
            <Link style={{ color: "black" }} href="/">
              <Typography color="text.primary" style={{}}>
                Blog
              </Typography>
            </Link>
            <UnshrinkableDiv style={{ width: "16px" }} />
          </ContactContainer>
        </HomeNavBar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "24px",
          }}
        >
          <List>
            <ListItem>
              <Typography color="text.primary">
                <a href="https://www.mygoalcreator.com">My Goal Creator</a> - A
                goal setting app that helps you set and track your goals with
                AI.
              </Typography>
            </ListItem>
          </List>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}
