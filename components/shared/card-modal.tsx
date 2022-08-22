import { Modal, Button, Box, Typography, CardMedia } from "@mui/material";
import React from "react";
import type { FC } from "react";
import { motion } from "framer-motion";
import style from "../../styles/Home.module.css";
import { MonterratBold, MonterratMedium } from "./styles";
import { bull } from "./card";

interface ModalProps {
  open: boolean;
  setOpen: Function;
  setSectionVisible: Function;
  features: string[];
}

export const CardModal: FC<ModalProps> = ({
  open = false,
  setOpen,
  setSectionVisible,
  features = [],
}) => {
  const handleClose = () => {
    setSectionVisible("flex");
    setOpen(false);
  };
  return (
    <motion.div
      whileInView={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 5, type: "spring" }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
        className={style.QuartzoBold}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "left",
            textAlign: "left",
            paddingLeft: "",
            backgroundColor: "white",
            width: "77%",
            height: "50%",
          }}
          sx={MonterratBold}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "360px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <iframe
              style={{ width: "100%" }}
              src="https://www.loom.com/embed/e1cf312e40894cf1896b33b47d5221b7"
              frameborder="0"
              webkitallowfullscreen
              mozallowfullscreen
              allowfullscreen
            ></iframe>
          </div>
          <div style={{ padding: "16px" }}>
            <Typography
              style={MonterratBold}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Details
            </Typography>
            {features.map((feature) => {
              return (
                <Typography
                  key={feature}
                  variant="body2"
                  component="p"
                  style={MonterratMedium}
                >
                  {bull} {feature}
                </Typography>
              );
            })}
          </div>
        </Box>
      </Modal>
    </motion.div>
  );
};
