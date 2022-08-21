import { Modal, Button, Box, Typography } from "@mui/material";
import React from "react";
import type { FC } from "react";
import { motion } from "framer-motion";
import style from "../../styles/Home.module.css";
import { MonterratBold, MonterratMedium } from "./styles";

interface ModalProps {
  open: boolean;
  setOpen: Function;
}

export const CardModal: FC<ModalProps> = ({ open = false, setOpen }) => {
  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className={style.QuartzoBold}
      >
        <motion.div>
          <Box
            style={{
              backgroundColor: "white",
              width: "200px",
              height: "200px",
            }}
            sx={MonterratBold}
          >
            <Typography
              style={MonterratMedium}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </motion.div>
      </Modal>
    </>
  );
};
