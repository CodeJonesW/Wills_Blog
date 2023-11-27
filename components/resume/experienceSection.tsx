import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import router from "next/router";
import { Box, List, ListItem, Grid } from "@mui/material";
import Link from "next/link";

interface ExperienceSectionProps {
  title: string;
  company: string;
  location: string;
  bullets: string[];
  date: string;
}

export default function ExperienceSection({
  title,
  bullets,
  company,
  location,
  date,
}: ExperienceSectionProps) {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingLeft: "32px",
      }}
    >
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "95vw",
          }}
        >
          <Box sx={{ flexDirection: "column" }}>
            <h5 style={{ marginBottom: "4px", marginTop: "8px" }}>{title}</h5>
            <p style={{ margin: 0, padding: 0 }}>
              {company} | {location}
            </p>
          </Box>
          <Box sx={{ mr: "32px" }}>
            <p>{date}</p>
          </Box>
        </Box>
        <List>
          {bullets.map((bullet) => {
            return (
              <ListItem>
                <p style={{ margin: 0, padding: 0 }}>- {bullet}</p>
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Box>
  );
}
