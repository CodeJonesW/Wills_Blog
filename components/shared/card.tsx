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

export const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const fontStyle = { fontFamily: "AngleterreBook" };

interface OutlinedCardProps {
  title: string;
  features: string[];
  setSectionVisible: Function;
  price: string;
}

export const OutlinedCard: FC<OutlinedCardProps> = ({
  title,
  features,
  setSectionVisible,
  price,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setSectionVisible("none");
    setOpen(true);
  };

  return (
    <Box style={{ padding: "16px" }} sx={{ maxWidth: 304 }}>
      <Card variant="outlined">
        <CardContent className={styles.AngleterreBook}>
          <Typography
            style={{ fontFamily: "AngleterreBook" }}
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography variant="h5" component="div"></Typography>
          <Typography
            style={{ fontFamily: "AngleterreBook" }}
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
          <Typography
            style={{ fontFamily: "AngleterreBook" }}
            sx={{ mb: 1.5 }}
            color="text.secondary"
          >
            {price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => handleOpen()} size="small">
            Learn More
          </Button>
        </CardActions>
        <CardModal
          open={open}
          setOpen={setOpen}
          setSectionVisible={setSectionVisible}
          features={[
            "Custom domain name",
            "Email sign uplist",
            "6 static content pages dynamic to all screen sizes",
            "Initial design and planning meeting",
            "Review meeting at 60% completion",
            "At 100% completion, we send you a link to demo and we create a final revisions list.",
            "Documentation on how the setup works so you can continue to make updates and improve your site.",
          ]}
        />
      </Card>
    </Box>
  );
};
