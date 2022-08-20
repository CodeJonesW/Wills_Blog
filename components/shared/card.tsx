import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "../../styles/Home.module.css";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const fontStyle = { fontFamily: "MontserratMedium" };

const card = (
  <React.Fragment>
    <CardContent className={styles.QuartzoBold}>
      <Typography
        style={{ fontFamily: "LemonMilkBold" }}
        sx={{ fontSize: 14 }}
        color="text.secondary"
        gutterBottom
      >
        The basics for success
      </Typography>
      <Typography variant="h5" component="div"></Typography>
      <Typography
        style={{ fontFamily: "MontserratMedium" }}
        sx={{ mb: 1.5 }}
        color="text.secondary"
      >
        What do you get?
      </Typography>

      <Typography style={fontStyle} variant="body2">
        {bull}Initial design and planning meeting (1 hour)
      </Typography>

      <Typography style={fontStyle} variant="body2">
        {bull}Review meeting at 60% completion (30 minutes)
      </Typography>
      <Typography style={fontStyle} variant="body2">
        {bull}At 100% completion, we send you a link to demo and we create a
        final revisions list.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box style={{ padding: "16px" }} sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
