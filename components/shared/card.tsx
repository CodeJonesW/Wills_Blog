import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "../../styles/Home.module.css";
import type { FC } from "react";
import { CardModal } from "./card-modal";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const fontStyle = { fontFamily: "MontserratMedium" };

interface OutlinedCardProps {
  title: string;
  features: string[];
}

export const OutlinedCard: FC<OutlinedCardProps> = ({ title, features }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Box style={{ padding: "16px" }} sx={{ minWidth: 275, maxWidth: 304 }}>
      <Card variant="outlined">
        <CardContent className={styles.QuartzoBold}>
          <Typography
            style={{ fontFamily: "LemonMilkBold" }}
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography variant="h5" component="div"></Typography>
          <Typography
            style={{ fontFamily: "MontserratMedium" }}
            sx={{ mb: 1.5 }}
            color="text.secondary"
          >
            What do you get?
          </Typography>
          {features.map((feature) => {
            return (
              <Typography
                key={feature}
                variant="body2"
                component="p"
                style={fontStyle}
              >
                {bull} {feature}
              </Typography>
            );
          })}
        </CardContent>
        <CardActions>
          <Button onClick={() => setOpen(true)} size="small">
            Learn More
          </Button>
        </CardActions>
        <CardModal open={open} setOpen={setOpen} />
      </Card>
    </Box>
  );
};
