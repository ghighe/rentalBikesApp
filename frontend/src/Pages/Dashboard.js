import React from "react";
import "./Dashboard.css";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridGap: "80px",
    padding: "30px"
  },

  paper: {
    height: "150px",
    marginTop: "60px",
    textAlign: "center",
    padding: "30px 0"
  }
});

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2>Dashboard</h2>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6" component="h3">
              Available bikes
            </Typography>
            <Typography component="p">48/50</Typography>
            <hr style={{ marginTop: "15px" }}></hr>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6" component="h3">
              Revenue
            </Typography>
            <Typography>34.000$</Typography>
            <hr style={{ marginTop: "15px" }}></hr>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6" component="h3">
              Fixed Issues
            </Typography>
            <Typography>75</Typography>
            <hr style={{ marginTop: "15px" }}></hr>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6" component="h3">
              Followers
            </Typography>
            <Typography>+245</Typography>
            <hr style={{ marginTop: "15px" }}></hr>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
