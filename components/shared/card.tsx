import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Small Business Support
      </Typography>
      <Typography variant="h5" component="div"></Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        What do you get?
      </Typography>

      <Typography variant="body2">
        {bull}Initial design and planning meeting (1 hour)
      </Typography>

      <Typography variant="body2">
        {bull}Review meeting at 60% completion (30 minutes)
      </Typography>
      <Typography variant="body2">
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
