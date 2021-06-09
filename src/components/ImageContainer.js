import React, { useState } from "react";
import { Grid, Paper, CircularProgress } from '@material-ui/core';
import useStyles from '../styles/styles'

const ImageContainer = ({ imgSrc, title }) => {
    const classes = useStyles();
    const [isLoaded, setLoaded] = useState(false);
    
      return (
        <React.Fragment >
          <Grid item xs={3} className={"shadow-drop-2-center"} >
            <Paper className={classes.paper} >
                {!isLoaded && <CircularProgress style={{marginTop: "50px"}} disableShrink />}
                <img 
                    src={imgSrc} 
                    alt={title} 
                    width="100%" 
                    height="100%" 
                    style={!isLoaded ? { display: "none" } : { display: "block" }} 
                    onLoad={() => setLoaded(true)}
                />
            </Paper>
          </Grid>
        </React.Fragment>
      );
  }

export default ImageContainer